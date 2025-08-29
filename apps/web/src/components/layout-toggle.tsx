'use client';

import * as React from 'react';
import { LayoutGrid, Sidebar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect } from 'react';

export function LayoutToggle() {
  const [variant, setVariant] = React.useState<'sidebar' | 'header'>('header');

  useEffect(() => {
    const saved = localStorage.getItem('layout-variant') as
      | 'sidebar'
      | 'header'
      | null;
    if (saved) setVariant(saved);
  }, []);

  const changeLayout = (next: 'sidebar' | 'header') => {
    setVariant(next);
    localStorage.setItem('layout-variant', next);
    window.location.reload(); // force re-render AppLayout with new variant
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          {variant === 'sidebar' ? (
            <Sidebar className='h-[1.2rem] w-[1.2rem]' />
          ) : (
            <LayoutGrid className='h-[1.2rem] w-[1.2rem]' />
          )}
          <span className='sr-only'>Toggle layout</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => changeLayout('sidebar')}>
          Sidebar Layout
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLayout('header')}>
          Header Layout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
