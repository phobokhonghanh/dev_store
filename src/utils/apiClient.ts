const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Function to make API calls and return the raw Response object
export const fetchApi = async (
  endpoint: string,
  options?: ApiOptions
): Promise<Response> => {
  const headers = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include',
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  return response;
};

export const apiClient = async <T>(
  endpoint: string,
  options?: ApiOptions
): Promise<T> => {
  const response = await fetchApi(endpoint, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};
