import React from 'react';
import { DownloadIcon, File } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { ipfsGateway } from '@/constants';

interface FileRowProps {
  value: React.ReactNode;
  fileCID: string;
  icon?: React.ReactNode;
}

export default function FileRow({ value, fileCID, icon }: FileRowProps) {
  return (
    <div className='flex flex-wrap items-center gap-4 w-full'>
      {/* Left side: icon + text */}
      <div className='flex items-center gap-4 flex-1 min-w-0'>
        <div className='flex items-center justify-center rounded-lg bg-secondary shrink-0 w-10 h-10'>
          {icon || <File />}
        </div>
        <div className='text-base font-normal leading-normal truncate'>
          {value}
        </div>
      </div>

      {/* Right side: button */}
      <div className='ml-auto flex-shrink-0'>
        <Link
          href={`${ipfsGateway}/${fileCID}`}
          target='_blank'
          rel='noopener noreferrer'
          download
        >
          <Button variant='outline' className='cursor-pointer'>
            <DownloadIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
