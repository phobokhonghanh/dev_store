import useSWR from 'swr';
import { buildQueryString } from '@/utils/url';
import { API_ROUTES } from '@/constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface Tool {
  name: string;
  logo: string;
  description: string;
  link: string;
}

export interface ToolsResponse {
  tools: Tool[];
  pageCount: number;
}

export const useTools = (params: { page: number; search: string }) => {
  const { page, search } = params;
  const { data, error, isLoading } = useSWR<ToolsResponse>(
    `${API_ROUTES.tools}?${buildQueryString({ page, search })}`,
    fetcher
  );

  return {
    tools: data?.tools || [],
    pageCount: data?.pageCount || 0,
    error,
    isLoading,
  };
};
