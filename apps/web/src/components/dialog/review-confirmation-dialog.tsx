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
import { Textarea } from '@/components/ui/textarea';
import { ReviewAction } from '@/types/proposal';
import { useForm } from 'react-hook-form';
import type { ReviewForm } from '@/schema/review';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';

interface ReviewConfirmationDialogProps {
  open: boolean;
  action: ReviewAction;
  onOpenChange: (open: boolean) => void;
  onConfirm: (action: ReviewAction, commentCID: string) => void;
}

export function ReviewConfirmationDialog({
  open,
  action,
  onOpenChange,
  onConfirm,
}: ReviewConfirmationDialogProps) {
  const form = useForm<ReviewForm>({
    defaultValues: { comment: '' },
  });

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpenChange(false);
  };

  const onSubmit = (data: ReviewForm) => {
    onConfirm(action, data.comment);
    // Clear form after submission
    form.reset();
    onOpenChange(false);
  };

  const actionLabel =
    action === ReviewAction.APPROVE
      ? 'Approve Proposal'
      : ReviewAction.REQUEST_CHANGES
      ? 'Request Proposal Changes'
      : 'Reject Proposal';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{actionLabel}</DialogTitle>
          <DialogDescription>
            {action === ReviewAction.APPROVE
              ? 'Any comments before proceeding? (optional)'
              : 'Please provide comments before proceeding.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='comment'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder='Enter your comments... (optional)'
                      {...field}
                      className='mt-4'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant='destructive' onClick={handleCancel}>
                Cancel
              </Button>
              <Button type='submit'>Confirm</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
