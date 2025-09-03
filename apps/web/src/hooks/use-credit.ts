import { PAGE_SIZE } from '@/constants';
import {
  type UserCreditsQuery,
  UserCreditsDocument,
  type UserRetiredCreditsQuery,
  UserRetiredCreditsDocument,
  type UserCreditsQueryVariables,
  type UserRetiredCreditsQueryVariables,
} from '@/generated/graphql';
import { graphClient } from '@/graphql/client';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useUserCredits(address: string | undefined) {
  return useInfiniteQuery({
    queryKey: ['userCredits', address],
    queryFn: async ({ pageParam = 0 }) => {
      if (!address) return null;
      const variables: UserCreditsQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        id: address,
      };
      const data = await graphClient.request<
        UserCreditsQuery,
        UserCreditsQueryVariables
      >(UserCreditsDocument, variables);
      return data.user?.creditBalances ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE; // next skip value
    },
    initialPageParam: 0,
    enabled: !!address,
  });
}

export function useUserRetiredCredits(address: string | undefined) {
  return useInfiniteQuery({
    queryKey: ['userRetiredCredits', address],
    queryFn: async ({ pageParam = 0 }) => {
      if (!address) return null;
      const variables: UserRetiredCreditsQueryVariables = {
        first: PAGE_SIZE,
        skip: pageParam,
        id: address,
      };
      const data = await graphClient.request<
        UserRetiredCreditsQuery,
        UserRetiredCreditsQueryVariables
      >(UserRetiredCreditsDocument, variables);
      return data.creditsRetireds ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE; // next skip value
    },
    initialPageParam: 0,
    enabled: !!address,
  });
}
