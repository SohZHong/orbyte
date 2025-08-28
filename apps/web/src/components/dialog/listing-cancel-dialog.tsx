'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '../ui/shadcn-io/spinner';

interface CreditRetireDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isCancelling?: boolean;
}

export function ListingCancelDialog({
  open,
  onOpenChange,
  onConfirm,
  isCancelling = false,
}: CreditRetireDialogProps) {
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Listing Cancellation</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this listing?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant='destructive'
            onClick={handleCancel}
            disabled={isCancelling}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isCancelling}>
            {isCancelling ? (
              <span className='inline-flex gap-1 items-center'>
                <Spinner variant='circle' /> Cancelling...
              </span>
            ) : (
              <span>Confirm</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
