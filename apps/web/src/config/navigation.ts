import {
  Home,
  History,
  Settings,
  CheckCircle,
  Folder,
  BookOpen,
  IdCard,
} from 'lucide-react';
import type { NavItem } from '@/types/nav';

export const navItems: Record<'Public' | 'Developer' | 'Auditor', NavItem[]> = {
  Public: [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Professional Application', href: '/apply', icon: IdCard },
  ],
  Developer: [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'My Projects', href: '/projects', icon: Folder },
    { title: 'Transactions', href: '/transaction', icon: History },
    { title: 'Settings', href: '/settings', icon: Settings },
  ],
  Auditor: [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Audits', href: '/audits', icon: CheckCircle },
    { title: 'Transactions', href: '/transaction', icon: History },
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
