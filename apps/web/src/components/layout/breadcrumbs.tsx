// components/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { BreadcrumbItemType } from '@/types/nav';

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItemType[];
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index === breadcrumbs.length - 1 ? (
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={item.href ?? '#'}>{item.title}</Link>
              </BreadcrumbLink>
            )}
            {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
