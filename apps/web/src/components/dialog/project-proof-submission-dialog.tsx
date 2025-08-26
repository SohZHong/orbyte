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
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { ProofSchema, type ProofForm } from '@/schema/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '../ui/shadcn-io/spinner';

interface ProjectProofSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (file: File) => void;
  isUploading?: boolean;
}

export function ProjectProofSubmissionDialog({
  open,
  onOpenChange,
  onConfirm,
  isUploading = false,
}: ProjectProofSubmissionDialogProps) {
  const form = useForm<ProofForm>({ resolver: zodResolver(ProofSchema) });

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onOpenChange(false);
    form.reset();
  };

  const onSubmit = (data: ProofForm) => {
    if (!data.file) return;
    onConfirm(data.file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Proof of Project Completion</DialogTitle>
          <DialogDescription>
            Please select the proof file you want to upload carefully. This
            action is irreversible and signifies that you have completed your
            project
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='file'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='file'
                      accept='.pdf,.doc,.docx,.png,.jpg'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                      className='mt-4'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant='destructive'
                onClick={handleCancel}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isUploading}>
                {isUploading ? (
                  <span className='inline-flex gap-1 items-center'>
                    <Spinner variant='circle' /> Uploading...
                  </span>
                ) : (
                  <span>Confirm</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
