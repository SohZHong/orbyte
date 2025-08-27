import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  ProofDocument,
  type ProofQuery,
  type ProofQueryVariables,
  ProofsDocument,
  type ProofsQuery,
  type ProofsQueryVariables,
} from '@/generated/graphql';
import { PAGE_SIZE } from '@/constants';
import { graphClient } from '@/graphql/client';

interface UseProofsParams {
  developer?: string;
  name?: string;
}

export function useProof(id: string) {
  return useQuery({
    queryKey: ['proof', id],
    queryFn: async () => {
      const data = await graphClient.request<ProofQuery, ProofQueryVariables>(
        ProofDocument,
        { id }
      );
      return data.proof;
    },
  });
}

export function useProjects(filters: UseProofsParams = {}) {
  return useInfiniteQuery({
    queryKey: ['proofs', filters],
    queryFn: async ({ pageParam = 0 }) => {
      const variables: ProofsQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        developer: filters.developer ?? '',
        name: filters.name ?? '',
      };

      const data = await graphClient.request<ProofsQuery, ProofsQueryVariables>(
        ProofsDocument,
        variables
      );

      return data.proofs ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE; // next skip value
    },
    initialPageParam: 0,
  });
}
