import type { User, UserQuery } from '@/generated/graphql';

export default function AuditorDashboard({
  user,
}: {
  user: UserQuery['user'];
}) {
  return <div>🔍 Auditor view for {user!.id}</div>;
}
