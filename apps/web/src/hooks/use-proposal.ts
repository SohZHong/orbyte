import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { graphClient } from '../graphql/client';
import {
  ProposalDocument,
  ProposalsDocument,
  ProposalStatus,
  Standard,
  type ProposalQuery,
  type ProposalQueryVariables,
  type ProposalsQuery,
  type ProposalsQueryVariables,
} from '@/generated/graphql';
import { PAGE_SIZE } from '@/constants';

interface UseProposalsParams {
  developer?: string;
  name?: string;
  location?: string;
  standard?: Standard;
  vintage?: number;
  status?: ProposalStatus;
}

export function useProposal(id: string) {
  return useQuery({
    queryKey: ['proposal', id],
    queryFn: async () => {
      const data = await graphClient.request<
        ProposalQuery,
        ProposalQueryVariables
      >(ProposalDocument, { id });
      return data.proposal;
    },
  });
}

export function useProposals(filters: UseProposalsParams = {}) {
  return useInfiniteQuery({
    queryKey: ['proposals', filters],
    queryFn: async ({ pageParam = 0 }) => {
      // Default: all statuses
      const statuses = filters.status
        ? [filters.status]
        : [
            ProposalStatus.PendingReview,
            ProposalStatus.ChangesRequested,
            ProposalStatus.Rejected,
            ProposalStatus.Approved,
          ];

      // Default: all standards
      const standards = filters.standard
        ? [filters.standard]
        : [Standard.GoldStandard, Standard.Vcs, Standard.Shariah];

      const variables: ProposalsQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        developer: filters.developer ?? '',
        name: filters.name ?? '',
        status_in: statuses,
        standard_in: standards,
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
