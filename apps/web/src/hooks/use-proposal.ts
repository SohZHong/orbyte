import { useInfiniteQuery } from '@tanstack/react-query';
import { graphClient } from '../graphql/client';
import {
  ProposalsDocument,
  ProposalStatus,
  Standard,
  type ProposalsQuery,
  type ProposalsQueryVariables,
} from '@/generated/graphql';
import { PAGE_SIZE } from '@/constants';

interface UseProposalsParams {
  name?: string;
  location?: string;
  standard?: Standard;
  vintage?: number;
  status?: ProposalStatus;
}

export function useProposals(filters: UseProposalsParams = {}) {
  return useInfiniteQuery({
    queryKey: ['proposals', filters],
    queryFn: async ({ pageParam = 0 }) => {
      const variables: ProposalsQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        name: filters.name ?? '',
        standard: filters.standard ?? Standard.Shariah,
        status: filters.status ?? ProposalStatus.PendingReview,
      };

      const data = await graphClient.request<
        ProposalsQuery,
        ProposalsQueryVariables
      >(ProposalsDocument, variables);

      return data.proposals ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE; // next skip value
    },
    initialPageParam: 0,
  });
}
