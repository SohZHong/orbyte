import {
  useInfiniteQuery,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';
import { graphClient } from '../graphql/client';
import {
  UserCreditsDocument,
  UserDocument,
  type UserCreditsQuery,
  type UserCreditsQueryVariables,
  type UserQuery,
  type UserQueryVariables,
} from '@/generated/graphql';
import { PAGE_SIZE } from '@/constants';

export function useUser(
  address: string | undefined
): UseQueryResult<UserQuery['user'], Error> {
  return useQuery({
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
      console.log(address);
      const data = await graphClient.request<
        UserCreditsQuery,
        UserCreditsQueryVariables
      >(UserCreditsDocument, variables);
      console.log(data);
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
