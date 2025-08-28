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
  FilePenIcon,
  ListOrdered,
} from 'lucide-react';
import type { NavItem } from '@/types/nav';
import type { Role } from '@/generated/graphql';

export const navItems: Record<Role, NavItem[]> = {
  Public: [
    { title: 'Dashboard', href: '/', icon: Home },
    { title: 'Professional Application', href: '/apply', icon: IdCard },
    { title: 'Credits', href: '/credit', icon: Coins },
    { title: 'Listing', href: '/listing', icon: ListOrdered },
  ],
  Developer: [
    { title: 'Dashboard', href: '/', icon: Home },
    { title: 'Projects', href: '/project', icon: Folder },
    { title: 'Proposals', href: '/proposal', icon: File },
    { title: 'Credits', href: '/credit', icon: Coins },
    { title: 'Listing', href: '/listing', icon: ListOrdered },
  ],
  Auditor: [
    { title: 'Dashboard', href: '/', icon: Home },
    { title: 'Proposal Audit', href: '/proposal-audit', icon: CheckCircle },
    { title: 'Proof Audit', href: '/proof-audit', icon: FilePenIcon },
    { title: 'Review History', href: '/review-history', icon: History },
    { title: 'Credits', href: '/credit', icon: Coins },
  ],
};

export const footerNavItems: NavItem[] = [
  {
    title: 'Github Repo',
    href: 'https://github.com/SohZHong/orbyte',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#vue',
    icon: BookOpen,
  },
];
