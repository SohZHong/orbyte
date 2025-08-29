import { PAGE_SIZE } from '@/constants';
import {
  DailyCreditStatsDocument,
  DailyRetirementStatsDocument,
  DailyMarketplaceStatsDocument,
  DailyTransactionStatsDocument,
  type DailyCreditStatsQuery,
  type DailyRetirementStatsQuery,
  type DailyMarketplaceStatsQuery,
  type DailyTransactionStatsQuery,
  type PublicStatsQuery,
  PublicStatsDocument,
} from '@/generated/graphql';
import { graphClient } from '@/graphql/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export function useDailyCreditStats() {
  return useInfiniteQuery({
    queryKey: ['dailyCreditStats'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await graphClient.request<DailyCreditStatsQuery>(
        DailyCreditStatsDocument,
        { first: PAGE_SIZE, skip: pageParam }
      );
      return data.dailyCreditStats_collection;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage && lastPage.length >= PAGE_SIZE
        ? allPages.length * PAGE_SIZE
        : undefined,
    initialPageParam: 0,
  });
}

export function useDailyRetirementStats() {
  return useInfiniteQuery({
    queryKey: ['dailyRetirementStats'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await graphClient.request<DailyRetirementStatsQuery>(
        DailyRetirementStatsDocument,
        { first: PAGE_SIZE, skip: pageParam }
      );
      return data.dailyRetirementStats_collection;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage && lastPage.length >= PAGE_SIZE
        ? allPages.length * PAGE_SIZE
        : undefined,
    initialPageParam: 0,
  });
}

// Marketplace stats
export function useDailyMarketplaceStats() {
  return useInfiniteQuery({
    queryKey: ['dailyMarketplaceStats'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await graphClient.request<DailyMarketplaceStatsQuery>(
        DailyMarketplaceStatsDocument,
        { first: PAGE_SIZE, skip: pageParam }
      );
      return data.dailyMarketplaceStats_collection;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage && lastPage.length >= PAGE_SIZE
        ? allPages.length * PAGE_SIZE
        : undefined,
    initialPageParam: 0,
  });
}

// Transactions
export function useDailyTransactionStats() {
  return useInfiniteQuery({
    queryKey: ['dailyTransactionStats'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await graphClient.request<DailyTransactionStatsQuery>(
        DailyTransactionStatsDocument,
        { first: PAGE_SIZE, skip: pageParam }
      );
      return data.dailyTransactionStats_collection;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage && lastPage.length >= PAGE_SIZE
        ? allPages.length * PAGE_SIZE
        : undefined,
    initialPageParam: 0,
  });
}

export function usePublicStats() {
  return useQuery({
    queryKey: ['publicStats'],
    queryFn: async () => {
      const data =
        await graphClient.request<PublicStatsQuery>(PublicStatsDocument);
      return data;
    },
  });
}
