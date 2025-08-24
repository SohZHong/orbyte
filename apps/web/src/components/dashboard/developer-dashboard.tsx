import type { UserQuery } from '@/generated/graphql';
import React from 'react';

export default function DeveloperDashboard({
  user,
}: {
  user: UserQuery['user'];
}) {
  return <React.Fragment></React.Fragment>;
  //   return <div>👩‍💻 Developer view for {user.id}</div>;
}
