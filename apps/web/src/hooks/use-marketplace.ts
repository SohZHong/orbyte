import { PAGE_SIZE } from '@/constants';
import {
  ListingStatus,
  MarketplaceListing_OrderBy,
  MarketplaceListingsDocument,
  OrderDirection,
  PublicMarketplaceListingsDocument,
  type MarketplaceListingsQuery,
  type MarketplaceListingsQueryVariables,
  type PublicMarketplaceListingsQuery,
  type PublicMarketplaceListingsQueryVariables,
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

interface UsePublicMarketplaceListingsParams {
  seller?: string;
  orderBy?: PublicMarketplaceListingsQueryVariables['orderBy'];
  orderDirection?: PublicMarketplaceListingsQueryVariables['orderDirection'];
}

export function usePublicMarketplaceListings(
  filters: UsePublicMarketplaceListingsParams = {}
) {
  return useInfiniteQuery({
    queryKey: ['publicMarketplaceListings', filters],
    queryFn: async ({ pageParam = 0 }) => {
      if (!filters.seller) return [];

      const now = Math.floor(Date.now() / 1000).toString(); // Unix seconds

      const variables: PublicMarketplaceListingsQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        orderBy: filters.orderBy ?? MarketplaceListing_OrderBy.CreatedAt,
        orderDirection: filters.orderDirection ?? OrderDirection.Desc,
        now: now,
      };

      const data = await graphClient.request<
        PublicMarketplaceListingsQuery,
        PublicMarketplaceListingsQueryVariables
      >(PublicMarketplaceListingsDocument, variables);

      return data.marketplaceListings ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE; // next skip value
    },
    initialPageParam: 0,
    enabled: !!filters.seller,
  });
}
