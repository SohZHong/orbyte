import { PAGE_SIZE } from '@/constants';
import {
  PendingProposalsDocument,
  PendingProofsDocument,
  type PendingProposalsQuery,
  type PendingProofsQuery,
} from '@/generated/graphql';
import { graphClient } from '@/graphql/client';
import { useInfiniteQuery } from '@tanstack/react-query';

export function usePendingProposals() {
  return useInfiniteQuery({
    queryKey: ['pendingProposals'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await graphClient.request<PendingProposalsQuery>(
        PendingProposalsDocument,
        { first: PAGE_SIZE, skip: pageParam }
      );
      return data.proposals;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage && lastPage.length >= PAGE_SIZE
        ? allPages.length * PAGE_SIZE
        : undefined,
    initialPageParam: 0,
  });
}

export function usePendingProofs() {
  return useInfiniteQuery({
    queryKey: ['pendingProofs'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await graphClient.request<PendingProofsQuery>(
        PendingProofsDocument,
        { first: PAGE_SIZE, skip: pageParam }
      );
      return data.proofs;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage && lastPage.length >= PAGE_SIZE
        ? allPages.length * PAGE_SIZE
        : undefined,
    initialPageParam: 0,
  });
}
