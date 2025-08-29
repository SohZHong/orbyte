import type { LucideIcon } from 'lucide-react';

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavItem {
  title: string;
  href?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  description?: string;
  children?: NavItem[];
}

export type BreadcrumbItemType = BreadcrumbItem;
