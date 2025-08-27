import { ProjectStatus } from '@/generated/graphql';
import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheckIcon,
  BanIcon,
  CircleDashedIcon,
  ConstructionIcon,
  SendIcon,
} from 'lucide-react';

export const statusMap: Record<
  ProjectStatus,
  {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    icon: LucideIcon;
  }
> = {
  [ProjectStatus.None]: {
    text: 'None',
    variant: 'outline',
    icon: CircleDashedIcon,
  },
  [ProjectStatus.InProgress]: {
    text: 'In Progress',
    variant: 'outline',
    icon: ConstructionIcon,
  },
  [ProjectStatus.ProofSubmitted]: {
    text: 'Approved',
    variant: 'default',
    icon: SendIcon,
  },
  [ProjectStatus.AuditRejected]: {
    text: 'Rejected',
    variant: 'destructive',
    icon: BanIcon,
  },
  [ProjectStatus.Finalized]: {
    text: 'Finalized',
    variant: 'default',
    icon: BadgeCheckIcon,
  },
};
