import { useInfiniteQuery } from '@tanstack/react-query';
import { graphClient } from '../graphql/client';
import {
  ProposalReviewsDocument,
  type ProposalReviewsQuery,
  type ProposalReviewsQueryVariables,
} from '@/generated/graphql';
import { PAGE_SIZE } from '@/constants';

interface UseProposalReviewsParams {
  auditor?: string;
  name?: string;
}

export function useProposalReviews(filters: UseProposalReviewsParams) {
  return useInfiniteQuery({
    queryKey: ['proposalReviews', filters],
    queryFn: async ({ pageParam = 0 }) => {
      const variables: ProposalReviewsQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        auditor: filters.auditor!,
        name: filters.name ?? '',
      };

      const data = await graphClient.request<
        ProposalReviewsQuery,
        ProposalReviewsQueryVariables
      >(ProposalReviewsDocument, variables);

      return data.proposalRevieweds ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE; // next skip value
    },
    initialPageParam: 0,
    enabled: !!filters.auditor, // only run when auditor is defined
  });
}
