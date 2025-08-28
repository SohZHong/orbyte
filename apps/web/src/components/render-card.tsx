import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

export default function renderCard(
  isLoading: boolean,
  title: string,
  value: number | null,
  description: string,
  icon: React.ReactNode,
  handleClick?: () => void,
  buttonText: string = 'View'
) {
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
