/**
 * Custom Error class để chứa thông tin chi tiết về lỗi API
 * Giúp UI có thể xử lý dựa trên status code (vd: 401 -> logout)
 */
export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Lấy Base URL, fallback về empty string để tránh lỗi undefined khi nối chuỗi
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Định nghĩa kiểu dữ liệu an toàn cho Query Params
// Cho phép null/undefined để tiện lợi khi truyền biến optional (sẽ bị lọc bỏ khi build string)
export type QueryParams = Record<string, string | number | boolean | null | undefined>;

// Mở rộng RequestInit nhưng giữ tính tương thích
interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
  params?: QueryParams;
}

/**
 * Helper để nối URL an toàn, tránh lỗi double slash (//)
 */
const normalizeUrl = (endpoint: string): string => {
  const cleanBase = BASE_URL.replace(/\/+$/, '');
  const cleanEndpoint = endpoint.replace(/^\/+/, '');
  return cleanBase ? `${cleanBase}/${cleanEndpoint}` : endpoint;
};

/**
 * Helper xây dựng Query String từ object params
 * Loại bỏ các key có giá trị null hoặc undefined
 * Input: { keyword: 'abc', filter: null, page: 1 } -> Output: "keyword=abc&page=1"
 */
export const buildQueryString = (params: QueryParams): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};

/**
 * Wrapper cơ bản cho fetch native
 * Default JSON + Custom headers
 * Default method: GET
 * Default credentials policy: 'include' (request with cookie)
 * Custom config
 */
export const handleCallAPI = async (
  endpoint: string,
  options: ApiOptions = {}
): Promise<Response> => {
  const { headers, params, ...customConfig } = options;

  const config: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
    ...customConfig,
  };

  let url = normalizeUrl(endpoint);
  if (params) {
    const queryString = buildQueryString(params);
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  return fetch(url, config);
};

/**
 * Generic API Client xử lý data và error
 * T: Kiểu dữ liệu trả về (Response Type)
 */
export const callAPI = async <T = unknown>(
  endpoint: string,
  options?: ApiOptions
): Promise<T> => {
  try {
    const response = await handleCallAPI(endpoint, options);

    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }
      
      const errorMessage = (errorData as any)?.message || response.statusText || 'API Error';
      throw new ApiError(errorMessage, response.status, errorData);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network Error',
      0,
      null
    );
  }
};