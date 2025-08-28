import { useQuery } from '@tanstack/react-query';
import { graphClient } from '@/graphql/client';
import {
  DeveloperStatsDocument,
  type DeveloperStatsQuery,
  type DeveloperStatsQueryVariables,
} from '@/generated/graphql';

export function useDeveloperStats(developer: string | undefined) {
  return useQuery({
    queryKey: ['developerStats', developer],
    queryFn: async () => {
      if (!developer) return null;
      const variables: DeveloperStatsQueryVariables = { developer };
      const data = await graphClient.request<DeveloperStatsQuery>(
        DeveloperStatsDocument,
        variables
      );
      return data;
    },
    enabled: !!developer,
  });
}
