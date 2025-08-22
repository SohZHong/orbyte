'use client';

import AppHeaderLayout from '@/components/app-header-layout';
import AppSidebarLayout from '@/components/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types/nav';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Home() {
  return (
    <AppHeaderLayout breadcrumbs={breadcrumbs}>
      <div className='flex flex-col gap-6 p-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>My Patients</h1>
          <p className='text-muted-foreground'>
            List of patients with confirmed bookings
          </p>
        </div>
        <h2 className='mb-2 font-medium'>API Status</h2>
      </div>
    </AppHeaderLayout>
  );
}
