'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useEffect, type ReactNode } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import React from 'react';
import { Role } from '@/generated/graphql';
import Loading from '../loading';

interface PublicOnlyRouteProps {
  children: ReactNode;
}

export default function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const router = useRouter();
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user, isLoading } = useUser(address);

  useEffect(() => {
    if (!isLoading) {
      if (user && user.role !== Role.Public) {
        router.replace('/');
      }
    }
  }, [isLoading, user, router]);

  if (isLoading) return <Loading />;

  return <React.Fragment>{children}</React.Fragment>;
}
