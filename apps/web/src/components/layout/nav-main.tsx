import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/types/nav';
import { Skeleton } from '../ui/skeleton';

export function NavMain({
  items,
  isLoading,
}: {
  items: NavItem[];
  isLoading?: boolean;
}) {
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
          : items.map((item) =>
              item.children ? (
                <SidebarMenuItem key={item.title}>
                  <Collapsible defaultOpen={true} className='w-full'>
                    <SidebarMenuButton asChild>
                      <CollapsibleTrigger className='group flex items-center gap-2 w-full'>
                        {item.icon && <item.icon className='h-4 w-4' />}
                        <span>{item.title}</span>
                        <ChevronRight className='ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90' />
                      </CollapsibleTrigger>
                    </SidebarMenuButton>
                    <CollapsibleContent className='CollapsibleContent'>
                      <div className='ml-6 mt-2 flex flex-col gap-1'>
                        {item.children.map((child) => (
                          <SidebarMenuButton
                            key={child.title}
                            asChild
                            isActive={child.href === path}
                            tooltip={child.title}
                          >
                            <Link href={child.href ?? '#'}>
                              {child.icon && <child.icon className='h-4 w-4' />}
                              <span>{child.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.href === path}
                    tooltip={item.title}
                  >
                    <Link href={item.href ?? '#'}>
                      {item.icon && <item.icon className='h-4 w-4' />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
