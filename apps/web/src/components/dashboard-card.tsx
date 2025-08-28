import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface DashboardCardProps {
  isLoading: boolean;
  title: string;
  value: number | null;
  description: string;
  icon: React.ReactNode;
  handleClick?: () => void;
  buttonText?: string;
}

export default function DashboardCard({
  isLoading,
  title,
  value,
  description,
  icon,
  handleClick,
  buttonText = 'View',
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {isLoading || value === null ? (
            <Skeleton className='h-6 w-16' />
          ) : (
            value
          )}
        </div>
        <p className='text-xs text-muted-foreground'>{description}</p>
        {handleClick && (
          <Button
            variant='outline'
            className='mt-4 w-full cursor-pointer'
            disabled={isLoading}
            onClick={handleClick}
          >
            {isLoading ? <Skeleton className='h-6 w-24' /> : buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
