import { BookOpen, Folder, History, Home, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { NavMain } from './nav-main';
import type { NavItem } from '@/types/nav';
import NavUser from './nav-user';
import { NavFooter } from './nav-footer';

// Menu items
const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Transaction',
    href: '/transaction',
    icon: History,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

const footerNavItems: NavItem[] = [
  {
    title: 'Github Repo',
    href: 'https://github.com/laravel/vue-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#vue',
    icon: BookOpen,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              {/* <Link :href="route('dashboard')">
                            <AppLogo />
                        </Link> */}
              <Link href={'/'}>Orbyte</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} />
        {/* <NavNotifications /> */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
