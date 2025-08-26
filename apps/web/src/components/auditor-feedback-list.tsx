import { useFragment, type FragmentType } from '@/generated';
import { AuditorFeedbackFieldsFragmentDoc } from '@/generated/graphql';
import { getTimeFromBlockchainTimestamp } from '@/lib/utils';
import React from 'react';

interface AuditorFeedbackListProps {
  reviews?: readonly FragmentType<typeof AuditorFeedbackFieldsFragmentDoc>[];
}

export function AuditorFeedbackList({ reviews }: AuditorFeedbackListProps) {
  const parsed = useFragment(AuditorFeedbackFieldsFragmentDoc, reviews ?? []);

  // filter out reviews without comments
  const withComments = parsed.filter(
    (review) => review.commentCID && review.commentCID.trim() !== ''
  );

  return (
    <React.Fragment>
      <h2 className='text-xl font-bold'>Auditor Feedback</h2>
      {!withComments.length ? (
        <p className='text-muted-foreground text-sm py-3'>
          No auditor feedback yet.
        </p>
      ) : (
        withComments.map((review, idx) => (
          <div key={idx} className='flex gap-3 py-3 border-t border-t-accent'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-wrap gap-3 md:gap-6 md:items-center'>
                <p className='font-bold truncate max-w-[200px]'>
                  {review.auditor.id}
                </p>
                <p className='text-muted-foreground text-sm'>
                  {getTimeFromBlockchainTimestamp(
                    review.timestamp
                  ).toLocaleString()}
                </p>
              </div>
              <p>{review.commentCID}</p>
            </div>
          </div>
        ))
      )}
    </React.Fragment>
  );
}
