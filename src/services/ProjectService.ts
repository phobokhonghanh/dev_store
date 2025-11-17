import useSWR from 'swr';
import { buildQueryString } from '@/utils/url';
import { API_ROUTES } from '@/constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface Project {
  name: string;
  logo: string;
  description: string;
  link: string;
}

export interface ProjectsResponse {
  projects: Project[];
  pageCount: number;
}

export const useProjects = (params: { page: number; search: string }) => {
  const { page, search } = params;
  const { data, error, isLoading } = useSWR<ProjectsResponse>(
    `${API_ROUTES.projects}?${buildQueryString({ page, search })}`,
    fetcher
  );

  return {
    projects: data?.projects || [],
    pageCount: data?.pageCount || 0,
    error,
    isLoading,
  };
};
