'use client';

import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import NavUser from './nav-user';
import { NavFooter } from './nav-footer';
import { navItems, footerNavItems } from '@/config/navigation';
import { useUser } from '@/hooks/use-user';
import { usePrivy } from '@privy-io/react-auth';
import Image from 'next/image';

export function AppSidebar() {
  const { user: privyUser } = usePrivy();
  const address = privyUser?.smartWallet?.address;
  const { data: user } = useUser(address);

  const role = user?.role ?? 'Public';
  const items = navItems[role];

  return (
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href={'/'}>
                <Image height={100} width={100} src='/logo.png' alt='Logo' />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
