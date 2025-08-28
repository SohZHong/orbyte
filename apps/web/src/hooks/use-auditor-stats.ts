import { useQuery } from '@tanstack/react-query';
import { graphClient } from '@/graphql/client';
import {
  AuditorStatsDocument,
  type AuditorStatsQuery,
} from '@/generated/graphql';

export function useAuditorStats(auditor: string | undefined) {
  return useQuery({
    queryKey: ['auditorStats', auditor],
    queryFn: async () => {
      if (!auditor) return null;
      const data = await graphClient.request<AuditorStatsQuery>(
        AuditorStatsDocument,
        { auditor }
      );
      return data;
    },
    enabled: !!auditor,
  });
}
