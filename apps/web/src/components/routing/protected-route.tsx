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

  // pull user from your subgraph
  const { user, isLoading, isResolved, notFound } = useUser(address);

  // handle redirects once results are retrieved
  useEffect(() => {
    if (!isResolved) return;

    if (notFound) {
      router.replace('/'); // no user at all
    } else if (user && !allowedRoles.includes(user.role as Role)) {
      router.replace('/'); // valid user but role mismatch
    }
  }, [isResolved, notFound, user, router, allowedRoles]);

  // while loading or waiting on Graph, show spinner
  if (isLoading || !isResolved) {
    return <Loading />;
  }

  // block rendering while redirecting
  if (notFound || (user && !allowedRoles.includes(user.role as Role))) {
    return null;
  }

  // ✅ authorized user
  return <React.Fragment>{children}</React.Fragment>;
}
