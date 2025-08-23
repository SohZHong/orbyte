'use client';

import type { BreadcrumbItemType } from '@/types/nav';
import type { ReactNode } from 'react';
import AppSidebarLayout from './app-sidebar-layout';

type AppLayoutProps = {
  breadcrumbs?: BreadcrumbItemType[];
  children: ReactNode;
};

export default function AppLayout({
  breadcrumbs = [],
  children,
}: AppLayoutProps) {
  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>{children}</AppSidebarLayout>
  );
}
