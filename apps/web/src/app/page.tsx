'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useUser } from '@/hooks/use-user';
import type { BreadcrumbItem } from '@/types/nav';
import DashboardContainer from '@/components//-container';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/' }];

export default function DashboardPage() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user, isLoading } = useUser(address);

  return (
    <DashboardContainer
      breadcrumbs={breadcrumbs}
      isLoading={isLoading}
      user={user}
    />
  );
}
