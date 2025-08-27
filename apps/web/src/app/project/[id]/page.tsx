'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppSidebarLayout from '@/components/app-sidebar-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types/nav';
import DetailRow from '@/components/detail-row';
import { graphQLStandardMap } from '@/types/proposal';
import { ipfsGateway } from '@/constants';
import Link from 'next/link';
import api from '@/config/axios';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { ProjectStatus, Role } from '@/generated/graphql';
import { useProject } from '@/hooks/use-project';
import { getTimeFromBlockchainTimestamp } from '@/lib/utils';
import { statusMap } from '@/types/project';
import { useProjectRegistryContract } from '@/hooks/use-project-registry-contract';
import { ProjectProofSubmissionDialog } from '@/components/dialog/project-proof-submission-dialog';
import ProtectedRoute from '@/components/routing/protected-route';
import FileRow from '@/components/file-row';

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: project, isLoading } = useProject(id);
  const [isDownload, setIsDownloading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { submitProof } = useProjectRegistryContract();

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Projects', href: '/project' },
    { title: 'Project Details', href: '#' },
  ];

  const downloadProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDownloading(true);
    await api
      .get(`/project/pdf/download?id=${project?.id}`, {
        responseType: 'blob',
      })
      .then(async (res) => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `project-${project?.id}.pdf`;
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);

        toast('Project downloaded', {
          description: `Please check your files`,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .catch((err) => {
        console.error('Failed to download project', err);
        toast('Download failed', {
          description: (err as Error).message,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  const canSubmitProof: boolean =
    project?.status === ProjectStatus.AuditRejected ||
    project?.status === ProjectStatus.InProgress;

  if (isLoading || !project) {
    return (
      <AppSidebarLayout breadcrumbs={breadcrumbs}>
        <div className='p-6 space-y-4'>
          <Skeleton className='h-10 w-1/3' />
          <Skeleton className='h-6 w-1/4' />
          <Skeleton className='h-[200px] w-full' />
        </div>
      </AppSidebarLayout>
    );
  }

  const handleProofConfirm = async (file: File) => {
    try {
      setIsUploading(true);

      // Upload
      const formData = new FormData();
      formData.append('proof', file);

      await api
        .post(`/project/proof/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(async (res) => {
          const { proofCid } = res.data.data;

          const tx = await submitProof(BigInt(project.id), proofCid);

          toast('Proof Uploaded Successfully', {
            description: `Tx Hash: ${tx.hash}`,
            action: {
              label: 'Close',
              onClick: () => toast.dismiss(),
            },
          });

          setIsDialogOpen(false); // close dialog after success
        });
    } catch (err) {
      console.error('Upload failed', err);
      toast('Upload failed', {
        description: (err as Error).message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[Role.Auditor, Role.Developer]}>
      <ProjectProofSubmissionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleProofConfirm}
        isUploading={isUploading}
      />
      <AppSidebarLayout breadcrumbs={breadcrumbs}>
        <div className='flex flex-col gap-6 p-6'>
          {/* Title */}
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>
                Project Details
              </h1>
              <p className='text-muted-foreground'>
                Initiated on{' '}
                {getTimeFromBlockchainTimestamp(
                  project.createdAt
                ).toLocaleString()}
              </p>
            </div>
            <Button variant='default'>
              <Link href={`/proposal/${project.proposal.id}`}>
                View Corresponding Proposal
              </Link>
            </Button>
          </div>

          {/* Project Details */}
          <h2 className='text-xl font-bold'>Project Details</h2>
          <div className='grid grid-cols-[20%_1fr] gap-x-6'>
            <DetailRow label='Project Name' value={project.proposal.name} />
            <DetailRow
              label='Project Description'
              value={project.proposal.description}
            />
            <DetailRow label='Location' value={project.proposal.location} />
            <DetailRow
              label='Estimated Credits'
              value={project.proposal.estimatedCredits?.toString()}
            />
            <DetailRow
              label='Status'
              value={
                <Badge>
                  {(() => {
                    const Icon = statusMap[project.status].icon;
                    return <Icon className='w-4 h-4 mr-1' />;
                  })()}
                  {statusMap[project.status].text}
                </Badge>
              }
            />
            <DetailRow
              label='Standard'
              value={graphQLStandardMap[project.proposal.standard]}
            />
          </div>

          {/* Submitted Information */}
          <h2 className='text-xl font-bold'>Submitted Information</h2>
          <FileRow
            fileCID={project.proposal.projectPlanCID}
            value='Project Plan'
          />
          <FileRow
            fileCID={project.proposal.eiaCID}
            value='Environmental Impact Assessment'
          />
          {project.proposal.otherDocsCID && (
            <FileRow
              fileCID={project.proposal.otherDocsCID}
              value='Other Documents'
            />
          )}

          {/* Actions */}
          <div className='flex justify-end gap-3 px-4 py-6'>
            {canSubmitProof && (
              <Button variant='secondary' onClick={() => setIsDialogOpen(true)}>
                Upload Proof of Completion
              </Button>
            )}
            <Button disabled={isDownload} onClick={downloadProject}>
              {isDownload ? (
                <span className='inline-flex gap-1 items-center'>
                  <Spinner variant='circle' /> Downloading
                </span>
              ) : (
                <span>Download Project</span>
              )}
            </Button>
          </div>
        </div>
      </AppSidebarLayout>
    </ProtectedRoute>
  );
}
