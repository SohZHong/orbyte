'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import Breadcrumbs from './breadcrumbs';
import type { BreadcrumbItemType } from '@/types/nav';

export default function AppSidebarHeader({
  breadcrumbs = [],
}: {
  breadcrumbs?: BreadcrumbItemType[];
}) {
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='-ml-1' />
        {breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
      </div>
    </header>
  );
}
