import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface QuickActionCardProps {
  isLoading: boolean;
  title: string;
  description: string;
  icon: LucideIcon;
  handleClick?: () => void;
}

export default function QuickActionCard({
  isLoading,
  title,
  description,
  icon: Icon,
  handleClick,
}: QuickActionCardProps) {
  return (
    <Button
      onClick={handleClick}
      variant='outline'
      className='h-auto justify-start py-4 cursor-pointer'
    >
      <div className='flex flex-col items-start gap-1 w-full'>
        <div className='flex items-center gap-2 w-full'>
          {isLoading ? (
            <Skeleton className='h-4 w-4 rounded' />
          ) : (
            <Icon className='h-4 w-4' />
          )}
          {isLoading ? (
            <Skeleton className='h-4 w-24 rounded' />
          ) : (
            <span className='font-medium'>{title}</span>
          )}
        </div>
        {isLoading ? (
          <Skeleton className='h-3 w-32 rounded mt-1' />
        ) : (
          <span className='text-xs text-muted-foreground'>{description}</span>
        )}
      </div>
    </Button>
  );
}
