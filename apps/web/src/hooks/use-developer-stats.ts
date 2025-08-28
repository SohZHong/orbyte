import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { graphClient } from '@/graphql/client';
import {
  DeveloperCreditBatchesDocument,
  type DeveloperCreditBatchesQuery,
  type DeveloperCreditBatchesQueryVariables,
  DeveloperProposalsDocument,
  DeveloperCreditsIssuedDocument,
  type DeveloperProposalsQuery,
  type DeveloperCreditsIssuedQuery,
} from '@/generated/graphql';
import { PAGE_SIZE } from '@/constants';

export function useDeveloperCreditBatches(developer: string | undefined) {
  return useInfiniteQuery({
    queryKey: ['developerCreditBatches', developer],
    queryFn: async ({ pageParam = 0 }) => {
      if (!developer) return null;
      const variables: DeveloperCreditBatchesQueryVariables = {
        developer,
        first: PAGE_SIZE,
        skip: pageParam,
      };
      const data = await graphClient.request<
        DeveloperCreditBatchesQuery,
        DeveloperCreditBatchesQueryVariables
      >(DeveloperCreditBatchesDocument, variables);
      return data.creditBatches;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE;
    },
    initialPageParam: 0,
    enabled: !!developer,
  });
}

export function useDeveloperProposals(developer: string | undefined) {
  return useInfiniteQuery({
    queryKey: ['developerProposals', developer],
    queryFn: async ({ pageParam = 0 }) => {
      if (!developer) return null;
      const data = await graphClient.request<DeveloperProposalsQuery>(
        DeveloperProposalsDocument,
        { developer, first: PAGE_SIZE, skip: pageParam }
      );
      return data.proposals;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage && lastPage.length >= PAGE_SIZE
        ? allPages.length * PAGE_SIZE
        : undefined,
    initialPageParam: 0,
    enabled: !!developer,
  });
}

export function useDeveloperCreditsIssued(developer: string | undefined) {
  return useInfiniteQuery({
    queryKey: ['developerCreditsIssued', developer],
    queryFn: async ({ pageParam = 0 }) => {
      if (!developer) return null;
      const data = await graphClient.request<DeveloperCreditsIssuedQuery>(
        DeveloperCreditsIssuedDocument,
        { developer, first: PAGE_SIZE, skip: pageParam }
      );
      return data.creditsIssueds;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage && lastPage.length >= PAGE_SIZE
        ? allPages.length * PAGE_SIZE
        : undefined,
    initialPageParam: 0,
    enabled: !!developer,
  });
}
