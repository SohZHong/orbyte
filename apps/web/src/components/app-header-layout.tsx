import type { BreadcrumbItemType } from '@/types/nav';
import type { ReactNode } from 'react';
import AppShell from '@/components/layout/app-shell';
import AppHeader from './layout/app-header';
import AppContent from './layout/app-content';

interface Props {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItemType[];
}

export default function AppHeaderLayout({ children, breadcrumbs = [] }: Props) {
  return (
    <AppShell variant='header'>
      <AppHeader breadcrumbs={breadcrumbs} />
      <AppContent>{children}</AppContent>
    </AppShell>
  );
}
