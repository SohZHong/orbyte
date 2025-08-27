'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useEffect, type ReactNode } from 'react';
import type { Role } from '@/generated/graphql';
import { usePrivy } from '@privy-io/react-auth';
import React from 'react';
import Loading from '../loading';

interface ProtectedRouteProps {
  allowedRoles: Array<Role>;
  children: ReactNode;
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user, isLoading } = useUser(address);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace('/'); // no user at all
      } else if (!allowedRoles.includes(user.role as Role)) {
        router.replace('/'); // redirect public users
      }
    }
  }, [isLoading, user, router, allowedRoles]);

  if (isLoading || !user) return <Loading />;

  return <React.Fragment>{children}</React.Fragment>;
}
