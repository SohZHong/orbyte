import {
  Home,
  History,
  CheckCircle,
  Folder,
  BookOpen,
  IdCard,
  Coins,
  File,
  FilePenIcon,
  ListOrdered,
  SquareActivity,
  Leaf,
  FileText,
} from 'lucide-react';
import type { NavItem } from '@/types/nav';
import type { Role } from '@/generated/graphql';

export const navItems: Record<Role, NavItem[]> = {
  Public: [
    { title: 'Dashboard', href: '/', icon: Home },
    { title: 'Professional Application', href: '/apply', icon: IdCard },
    {
      title: 'Credits',
      icon: Coins,
      children: [
        {
          icon: SquareActivity,
          title: 'Available',
          href: '/credit',
          description: 'Manage your active carbon credits',
        },
        {
          icon: Leaf,
          title: 'Retired',
          href: '/credit/retirement',
          description: 'View retirement records and proofs',
        },
        {
          icon: ListOrdered,
          title: 'Listing',
          href: '/credit/listing',
          description: 'Manage your carbon credit listings',
        },
      ],
    },
  ],
  Developer: [
    { title: 'Dashboard', href: '/', icon: Home },
    { title: 'Projects', href: '/project', icon: Folder },
    { title: 'Proposals', href: '/proposal', icon: File },
    {
      title: 'Credits',
      icon: Coins,
      children: [
        {
          icon: SquareActivity,
          title: 'Available',
          href: '/credit',
          description: 'Manage your active carbon credits',
        },
        {
          icon: Leaf,
          title: 'Retired',
          href: '/credit/retirement',
          description: 'View retirement records and proofs',
        },
        {
          icon: ListOrdered,
          title: 'Listing',
          href: '/credit/listing',
          description: 'Manage your carbon credit listings',
        },
      ],
    },
  ],
  Auditor: [
    { title: 'Dashboard', href: '/', icon: Home },
    {
      title: 'Audit',
      icon: FileText,
      children: [
        {
          icon: CheckCircle,
          title: 'Proposals',
          href: '/audit/proposal',
          description: 'Manage your pending proposal audits',
        },
        {
          icon: FilePenIcon,
          title: 'Proofs',
          href: '/audit/proof',
          description: 'Manage your pending proof audits',
        },
      ],
    },
    { title: 'Review History', href: '/review-history', icon: History },
    {
      title: 'Credits',
      icon: Coins,
      children: [
        {
          icon: SquareActivity,
          title: 'Available',
          href: '/credit',
          description: 'Manage your active carbon credits',
        },
        {
          icon: Leaf,
          title: 'Retired',
          href: '/credit/retirement',
          description: 'View retirement records and proofs',
        },
        {
          icon: ListOrdered,
          title: 'Listing',
          href: '/credit/listing',
          description: 'Manage your carbon credit listings',
        },
      ],
    },
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
