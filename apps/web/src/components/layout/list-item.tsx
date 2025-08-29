import Link from 'next/link';
import { NavigationMenuLink } from '../ui/navigation-menu';
import type { LucideIcon } from 'lucide-react';

type ListItemProps = React.ComponentPropsWithoutRef<'li'> & {
  href: string;
  title: string;
  icon?: LucideIcon;
};

export default function ListItem({
  title,
  children,
  href,
  icon: Icon,
  ...props
}: ListItemProps) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className='flex flex-row items-center gap-2 text-sm font-medium leading-none'>
            {Icon && <Icon className='h-4 w-4' />}
            {title}
          </div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
