import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { graphClient } from '../graphql/client';
import {
  UserDocument,
  type UserQuery,
  type UserQueryVariables,
} from '@/generated/graphql';

export function useUser(
  address: string | undefined
): UseQueryResult<UserQuery['user'], Error> {
  return useQuery({
    queryKey: ['user', address],
    queryFn: async () => {
      if (!address) return null;
      const data = await graphClient.request<UserQuery, UserQueryVariables>(
        UserDocument,
        { id: address.toLowerCase() }
      );
      return data.user;
    },
    enabled: !!address,
  });
}
