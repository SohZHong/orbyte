import type { NavItem } from '@/types/nav';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

interface SidebarNavProps {
  items: NavItem[];
}

import { Skeleton } from '@/components/ui/skeleton';

export function NavMain({
  items,
  isLoading,
}: SidebarNavProps & { isLoading?: boolean }) {
  const path = usePathname();

  return (
    <SidebarGroup className='px-2 py-0'>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton asChild tooltip=''>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4 rounded' /> {/* fake icon */}
                    <Skeleton className='h-4 w-20' /> {/* fake text */}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          : items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={item.href === path}
                  tooltip={item.title}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
