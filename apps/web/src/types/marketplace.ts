import { ListingStatus } from '@/generated/graphql';
import {
  CheckIcon,
  ConstructionIcon,
  XIcon,
  type LucideIcon,
} from 'lucide-react';

export const statusMap: Record<
  ListingStatus,
  {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    icon: LucideIcon;
  }
> = {
  [ListingStatus.Active]: {
    text: 'Active',
    variant: 'outline',
    icon: ConstructionIcon,
  },
  [ListingStatus.Filled]: {
    text: 'Filled',
    variant: 'default',
    icon: CheckIcon,
  },
  [ListingStatus.Cancelled]: {
    text: 'Cancelled',
    variant: 'destructive',
    icon: XIcon,
  },
};
