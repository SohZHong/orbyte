import {
  useInfiniteQuery,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';
import { graphClient } from '../graphql/client';
import {
  UserCreditsDocument,
  UserDocument,
  UserRetiredCreditsDocument,
  type UserCreditsQuery,
  type UserCreditsQueryVariables,
  type UserQuery,
  type UserQueryVariables,
  type UserRetiredCreditsQuery,
  type UserRetiredCreditsQueryVariables,
} from '@/generated/graphql';
import { PAGE_SIZE } from '@/constants';

export function useUser(address: string | undefined) {
  const query = useQuery({
    queryKey: ['user', address],
    queryFn: async () => {
      const data = await graphClient.request<UserQuery, UserQueryVariables>(
        UserDocument,
        { id: address!.toLowerCase() }
      );
      return data.user;
    },
    enabled: !!address,
  });

  return {
    ...query,
    user: query.data,
    isLoading: query.isLoading,
    isResolved: query.isSuccess || query.isError, // finished fetching
    notFound: query.isSuccess && !query.data, // query returned no user
  };
}

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
