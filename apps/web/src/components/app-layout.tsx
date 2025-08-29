'use client';

import { useEffect, useState } from 'react';
import type { BreadcrumbItemType } from '@/types/nav';
import type { ReactNode } from 'react';
import AppShell from '@/components/layout/app-shell';
import { AppSidebar } from '@/components/layout/app-sidebar';
import AppSidebarHeader from '@/components/layout/app-sidebar-header';
import AppHeader from '@/components/layout/app-header';
import AppContent from '@/components/layout/app-content';
import Loading from './loading';

interface Props {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItemType[];
}

export default function AppLayout({ children, breadcrumbs = [] }: Props) {
  const [variant, setVariant] = useState<'sidebar' | 'header' | null>(null);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('layout-variant') as
      | 'sidebar'
      | 'header'
      | null;
    setVariant(saved ?? 'header'); // default to header
  }, []);

  if (!variant) {
    return <Loading />;
  }

  if (variant === 'header') {
    return (
      <AppShell variant='header'>
        <AppHeader breadcrumbs={breadcrumbs} />
        <AppContent>{children}</AppContent>
      </AppShell>
    );
  }

  return (
    <AppShell variant='sidebar'>
      <AppSidebar />
      <main className='overflow-x-hidden flex-1'>
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </main>
    </AppShell>
  );
}
