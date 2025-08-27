import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  ProjectsWithProofDocument,
  type ProjectsWithProofQuery,
  type ProjectsWithProofQueryVariables,
  ProofDocument,
  type ProofQuery,
  type ProofQueryVariables,
  Standard,
} from '@/generated/graphql';
import { PAGE_SIZE } from '@/constants';
import { graphClient } from '@/graphql/client';

interface UseProofsParams {
  developer?: string;
  name?: string;
  standard?: Standard;
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

export function useProofs(filters: UseProofsParams = {}) {
  return useInfiniteQuery({
    queryKey: ['proofs', filters],
    queryFn: async ({ pageParam = 0 }) => {
      const standards = filters.standard
        ? [filters.standard]
        : [Standard.GoldStandard, Standard.Vcs, Standard.Shariah];

      const variables: ProjectsWithProofQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        developer: filters.developer ?? '',
        name: filters.name ?? '',
        standard_in: standards,
      };

      const data = await graphClient.request<
        ProjectsWithProofQuery,
        ProjectsWithProofQueryVariables
      >(ProjectsWithProofDocument, variables);

      return data.projects ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE; // next skip value
    },
    initialPageParam: 0,
  });
}
