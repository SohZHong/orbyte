import { useQuery } from '@tanstack/react-query';
import { graphClient } from '../graphql/client';
import {
  UserDocument,
  type UserQuery,
  type UserQueryVariables,
} from '@/generated/graphql';

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
