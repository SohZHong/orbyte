import type { NavItem } from '@/types/nav';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

interface SidebarNavProps {
  items: NavItem[];
  extendedClass?: string;
}

export function NavFooter({ items, extendedClass }: SidebarNavProps) {
  return (
    <SidebarGroup
      className={`group-data-[collapsible=icon]:p-0 ${extendedClass || ''}`}
    >
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className='text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100'
                asChild
              >
                <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  href={item.href!}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
