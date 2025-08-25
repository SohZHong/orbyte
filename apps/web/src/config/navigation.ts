import {
  Home,
  History,
  Settings,
  CheckCircle,
  Folder,
  BookOpen,
  IdCard,
  Coins,
  File,
} from 'lucide-react';
import type { NavItem } from '@/types/nav';

export const navItems: Record<'Public' | 'Developer' | 'Auditor', NavItem[]> = {
  Public: [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Professional Application', href: '/apply', icon: IdCard },
  ],
  Developer: [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Projects', href: '/project', icon: Folder },
    { title: 'Proposals', href: '/proposal', icon: File },
    { title: 'Credits', href: '/credit', icon: Coins },
    { title: 'Settings', href: '/settings', icon: Settings },
  ],
  Auditor: [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Audits', href: '/audit', icon: CheckCircle },
    { title: 'Review History', href: '/review-history', icon: History },
    { title: 'Projects', href: '/project', icon: Folder },
    { title: 'Settings', href: '/settings', icon: Settings },
  ],
};

export const footerNavItems: NavItem[] = [
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
