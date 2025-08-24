'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Folder,
  IdCard,
  LayoutGrid,
  Menu,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLogo from '@/components/logo/app-logo';
import type { BreadcrumbItem, NavItem } from '@/types/nav';
import Breadcrumbs from './breadcrumbs';
import { UserDropdown } from '../user-dropdown';
import { ModeToggle } from '../mode-toggle';
import { usePrivy } from '@privy-io/react-auth';
import { useUser } from '@/hooks/use-user';
import { footerNavItems, navItems } from '@/config/navigation';

interface Props {
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppHeader({ breadcrumbs = [] }: Props) {
  const pathname = usePathname();

  const isCurrentRoute = (url: string) => pathname === url;
  const activeItemStyles = (url: string) =>
    isCurrentRoute(url)
      ? 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
      : '';

  const { user: privyUser } = usePrivy();

  const address = privyUser?.smartWallet?.address;
  const { data: user } = useUser(address);

  const role = user?.role ?? 'Public';
  const mainNavItems = navItems[role];

  return (
    <div>
      {/* Top Header */}
      <div className='border-b border-sidebar-border/80'>
        <div className='mx-auto flex h-16 items-center px-4 md:max-w-7xl'>
          {/* Mobile Menu */}
          <div className='lg:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='mr-2 h-9 w-9'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-[300px] p-6'>
                <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
                <SheetHeader className='flex justify-start text-left'>
                  <AppLogo className='size-6 fill-current text-black dark:text-white' />
                </SheetHeader>
                <div className='flex h-full flex-1 flex-col justify-between space-y-4 py-6'>
                  <nav className='-mx-3 space-y-1'>
                    {mainNavItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent ${activeItemStyles(
                          item.href
                        )}`}
                      >
                        {item.icon && <item.icon className='h-5 w-5' />}
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                  <div className='flex flex-col space-y-4'>
                    {footerNavItems.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center space-x-2 text-sm font-medium'
                      >
                        {item.icon && <item.icon className='h-5 w-5' />}
                        <span>{item.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href='/dashboard' className='flex items-center gap-x-2'>
            <AppLogo />
          </Link>

          {/* Desktop Menu */}
          <div className='hidden h-full lg:flex lg:flex-1'>
            <NavigationMenu className='ml-10 flex h-full items-stretch'>
              <NavigationMenuList className='flex h-full items-stretch space-x-2'>
                {mainNavItems.map((item) => (
                  <NavigationMenuItem
                    key={item.title}
                    className='relative flex h-full items-center'
                  >
                    <Link
                      href={item.href}
                      className={`${navigationMenuTriggerStyle()} ${activeItemStyles(
                        item.href
                      )} h-9 cursor-pointer px-3`}
                    >
                      {item.icon && <item.icon className='mr-2 h-4 w-4' />}
                      {item.title}
                    </Link>
                    {isCurrentRoute(item.href) && (
                      <div className='absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white' />
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right-side controls */}
          <div className='ml-auto flex items-center space-x-2'>
            <div className='relative flex items-center space-x-1'>
              <ModeToggle />

              {/* External links with tooltips */}
              <div className='hidden space-x-1 lg:flex'>
                {footerNavItems.map((item) => (
                  <TooltipProvider key={item.title} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='group h-9 w-9'
                        >
                          <a
                            href={item.href}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <span className='sr-only'>{item.title}</span>
                            {item.icon && (
                              <item.icon className='size-5 opacity-80 group-hover:opacity-100' />
                            )}
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>

            {/* User Dropdown */}
            <UserDropdown />
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 1 && (
        <div className='flex w-full border-b border-sidebar-border/70'>
          <div className='mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </div>
      )}
    </div>
  );
}
