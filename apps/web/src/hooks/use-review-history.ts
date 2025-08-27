import { useInfiniteQuery } from '@tanstack/react-query';
import { graphClient } from '../graphql/client';
import {
  ProofAuditsDocument,
  ProposalReviewsDocument,
  ReviewAction,
  type ProofAuditsQuery,
  type ProofAuditsQueryVariables,
  type ProposalReviewsQuery,
  type ProposalReviewsQueryVariables,
} from '@/generated/graphql';
import { PAGE_SIZE } from '@/constants';

export type ReviewHistoryItem = {
  type: 'proposal' | 'proof';
  id: string;
  timestamp: string;
  action: ReviewAction | number;
  name: string;
  submittedAt: string;
  developer?: string;
};

interface UseReviewHistoryParams {
  auditor?: string;
  developer?: string;
}

export function useReviewHistory(filters: UseReviewHistoryParams) {
  return useInfiniteQuery({
    queryKey: ['reviewHistory', filters],
    queryFn: async ({ pageParam = 0 }) => {
      if (!filters.auditor) return [];

      const proposalVars: ProposalReviewsQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        auditor: filters.auditor,
      };

      const proofVars: ProofAuditsQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        auditor: filters.auditor,
      };

      // Fetch both in parallel
      const [proposalData, proofData] = await Promise.all([
        graphClient.request<
          ProposalReviewsQuery,
          ProposalReviewsQueryVariables
        >(ProposalReviewsDocument, proposalVars),
        graphClient.request<ProofAuditsQuery, ProofAuditsQueryVariables>(
          ProofAuditsDocument,
          proofVars
        ),
      ]);

      // Normalize ProposalReviews
      const proposalItems: ReviewHistoryItem[] =
        proposalData.proposalRevieweds?.flatMap((reviewed) =>
          reviewed.auditor.reviews.map((r) => ({
            type: 'proposal' as const,
            id: r.proposal.id,
            timestamp: r.timestamp,
            action: r.action,
            name: r.proposal.name,
            submittedAt: r.proposal.submittedAt,
            developer: r.proposal?.developer?.id,
          }))
        ) ?? [];

      // Normalize ProofAudits
      const proofItems: ReviewHistoryItem[] =
        proofData.proofAudits?.map((p) => ({
          type: 'proof' as const,
          id: p.proof.id,
          name: p.proof.project.proposal.name,
          timestamp: p.timestamp,
          action: p.action,
          submittedAt: p.proof.submittedAt,
          developer: p.proof.developer.id,
        })) ?? [];

      // Combine, sort by timestamp descending
      const combined = [...proposalItems, ...proofItems].sort(
        (a, b) => Number(b.timestamp) - Number(a.timestamp)
      );

      return combined;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE;
    },
    initialPageParam: 0,
    enabled: !!filters.auditor,
  });
}
