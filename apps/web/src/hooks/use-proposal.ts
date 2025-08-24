import { useInfiniteQuery } from '@tanstack/react-query';
import { graphClient } from '../graphql/client';
import {
  ProposalsDocument,
  type ProposalsQuery,
  type ProposalsQueryVariables,
} from '@/generated/graphql';
import { PAGE_SIZE } from '@/constants';

export function useProposals() {
  return useInfiniteQuery({
    queryKey: ['proposals'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await graphClient.request<
        ProposalsQuery,
        ProposalsQueryVariables
      >(ProposalsDocument, {
        first: PAGE_SIZE,
        skip: pageParam,
      });
      return data.proposals;
    },
    getNextPageParam: (lastPage, allPages) => {
      // If we got less than PAGE_SIZE, no more data
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE; // next skip value
    },
    initialPageParam: 0,
  });
}
