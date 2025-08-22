import type { BreadcrumbItemType } from '@/types/nav';
import type { ReactNode } from 'react';
import AppShell from './app-shell';
import { AppSidebar } from './app-sidebar';
import AppSidebarHeader from './app-sidebar-header';

interface Props {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItemType[];
}

export default function AppSidebarLayout({
  children,
  breadcrumbs = [],
}: Props) {
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
