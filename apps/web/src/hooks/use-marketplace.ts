import { PAGE_SIZE } from '@/constants';
import {
  ListingStatus,
  MarketplaceListingsDocument,
  type MarketplaceListingsQuery,
  type MarketplaceListingsQueryVariables,
} from '@/generated/graphql';
import { graphClient } from '@/graphql/client';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseMarketplaceListingsParams {
  seller?: string;
  status?: ListingStatus;
}

export function useMarketplaceListings(
  filters: UseMarketplaceListingsParams = {}
) {
  return useInfiniteQuery({
    queryKey: ['marketplaceListings', filters],
    queryFn: async ({ pageParam = 0 }) => {
      const statuses = filters.status
        ? [filters.status]
        : [ListingStatus.Active, ListingStatus.Cancelled, ListingStatus.Filled];

      const variables: MarketplaceListingsQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        seller: filters.seller ?? '',
        status_in: statuses,
      };

      const data = await graphClient.request<
        MarketplaceListingsQuery,
        MarketplaceListingsQueryVariables
      >(MarketplaceListingsDocument, variables);

      return data.marketplaceListings ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE; // next skip value
    },
    initialPageParam: 0,
  });
}
