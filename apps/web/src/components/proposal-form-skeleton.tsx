import { Skeleton } from './ui/skeleton';

export default function ProposalFormSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Basic Info */}
      <div className='space-y-4'>
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-6 w-48' />
        <Skeleton className='h-24 w-full' />
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-10 w-full' />
      </div>

      {/* Numbers */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-6 w-24' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>

      {/* Standard */}
      <Skeleton className='h-6 w-24' />
      <Skeleton className='h-10 w-full' />

      {/* Methodology */}
      <Skeleton className='h-6 w-28' />
      <Skeleton className='h-10 w-full' />

      {/* Document Uploads */}
      <div className='space-y-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='space-y-2'>
            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-10 w-full' />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Skeleton className='h-12 w-full' />
    </div>
  );
}
