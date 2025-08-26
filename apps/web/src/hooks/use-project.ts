import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  ProjectDocument,
  type ProjectQuery,
  type ProjectQueryVariables,
  ProjectsDocument,
  type ProjectsQuery,
  type ProjectsQueryVariables,
  ProjectStatus,
} from '@/generated/graphql';
import { PAGE_SIZE } from '@/constants';
import { graphClient } from '@/graphql/client';

interface UseProjectsParams {
  developer?: string;
  status?: ProjectStatus;
  name?: string;
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const data = await graphClient.request<
        ProjectQuery,
        ProjectQueryVariables
      >(ProjectDocument, { id });
      return data.project;
    },
  });
}

export function useProjects(filters: UseProjectsParams = {}) {
  return useInfiniteQuery({
    queryKey: ['projects', filters],
    queryFn: async ({ pageParam = 0 }) => {
      const statuses = filters.status
        ? [filters.status]
        : [
            ProjectStatus.None,
            ProjectStatus.InProgress,
            ProjectStatus.ProofSubmitted,
            ProjectStatus.AuditRejected,
            ProjectStatus.Finalized,
          ];

      const variables: ProjectsQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        developer: filters.developer ?? '',
        status_in: statuses,
        name: filters.name ?? '',
      };

      const data = await graphClient.request<
        ProjectsQuery,
        ProjectsQueryVariables
      >(ProjectsDocument, variables);

      return data.projects ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE; // next skip value
    },
    initialPageParam: 0,
  });
}
