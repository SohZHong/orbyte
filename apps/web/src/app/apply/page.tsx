'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppHeaderLayout from '@/components/app-header-layout';

export default function ApplyAsProfessionalPage() {
  const [role, setRole] = useState<string>('auditor');
  const [idDoc, setIdDoc] = useState<File | null>(null);
  const [addressDoc, setAddressDoc] = useState<File | null>(null);
  const [certDoc, setCertDoc] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    // TODO: integrate with your smart contract
    // Example: call a contract method to submit role + documents (IPFS upload first)
    console.log('Submitting:', {
      role,
      idDoc,
      addressDoc,
      certDoc,
    });

    setTimeout(() => {
      setLoading(false);
      alert('Documents submitted successfully!');
    }, 1500);
  };

  return (
    <AppHeaderLayout>
      <div className='flex min-h-screen flex-col bg-[#11221c] px-6 py-10 text-white'>
        <div className='mx-auto w-full max-w-3xl space-y-8'>
          {/* Header */}
          <h1 className='text-3xl font-bold'>Complete Your KYC</h1>

          {/* Progress */}
          <Card className='bg-[#1a322a] border-[#24473b]'>
            <CardHeader>
              <CardTitle className='text-white'>KYC Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-2 w-full rounded bg-[#346555]'>
                <div
                  className='h-2 rounded bg-[#14b881]'
                  style={{ width: '25%' }}
                />
              </div>
              <p className='mt-2 text-sm text-[#93c8b6]'>Step 1 of 4</p>
            </CardContent>
          </Card>

          {/* Role Selection */}
          <Card className='bg-[#1a322a] border-[#24473b]'>
            <CardHeader>
              <CardTitle className='text-white'>Role Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={role}
                onValueChange={setRole}
                className='space-y-3'
              >
                <div className='flex items-center space-x-3 rounded-lg border border-[#346555] p-4'>
                  <RadioGroupItem value='auditor' id='auditor' />
                  <Label htmlFor='auditor' className='text-white'>
                    Auditor
                    <p className='text-sm text-[#93c8b6]'>
                      Verify and validate carbon offset projects.
                    </p>
                  </Label>
                </div>

                <div className='flex items-center space-x-3 rounded-lg border border-[#346555] p-4'>
                  <RadioGroupItem value='developer' id='developer' />
                  <Label htmlFor='developer' className='text-white'>
                    Project Developer
                    <p className='text-sm text-[#93c8b6]'>
                      Create and manage carbon offset projects.
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Document Uploads */}
          <Card className='bg-[#1a322a] border-[#24473b]'>
            <CardHeader>
              <CardTitle className='text-white'>Document Submission</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Label className='text-white'>Upload ID Document</Label>
                <Input
                  type='file'
                  onChange={(e) => handleFileChange(e, setIdDoc)}
                  className='mt-2 border-[#346555] bg-[#1a322a] text-white'
                />
              </div>
              <div>
                <Label className='text-white'>Upload Proof of Address</Label>
                <Input
                  type='file'
                  onChange={(e) => handleFileChange(e, setAddressDoc)}
                  className='mt-2 border-[#346555] bg-[#1a322a] text-white'
                />
              </div>
              <div>
                <Label className='text-white'>
                  Upload Professional Certification (if applicable)
                </Label>
                <Input
                  type='file'
                  onChange={(e) => handleFileChange(e, setCertDoc)}
                  className='mt-2 border-[#346555] bg-[#1a322a] text-white'
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className='flex justify-end'>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className='bg-[#14b881] text-[#11221c] hover:bg-[#109a6c]'
            >
              {loading ? 'Submitting...' : 'Submit Documents'}
            </Button>
          </div>

          {/* Info */}
          <div className='space-y-4 text-sm text-[#93c8b6]'>
            <p>
              Your documents are currently under review. This process typically
              takes 2–3 business days. You will receive a notification once the
              verification is complete.
            </p>
            <p>
              For questions, contact{' '}
              <a href='mailto:support@orbyte.com' className='underline'>
                support@orbyte.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </AppHeaderLayout>
  );
}
