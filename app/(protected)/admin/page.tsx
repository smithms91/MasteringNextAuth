'use client';

import { admin } from '@/actions/Admin';
import FormSuccess from '@/components/FormSuccess';
import { RoleGate } from '@/components/auth/RoleGate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserRole } from '@prisma/client';

import React from 'react';
import { toast } from 'sonner';


const AdminPage = () => {

  const onServerActionClick = () => {
    admin().then(res => {
      if (res.success) {
        toast.success(res.success);
      } else {
        toast.error(res.error);
      }
    });
  };

  const onApiRouteClick = () => {
    fetch('/api/admin').then(res => {
      if (res.status === 200) {
        toast.success('You are an admin!');
      } else {
        toast.error('Forbidden API Route!');
      }
    }).catch(err => {
      console.error(err);
    });
  }

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>🗝️ Admin</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You're an admin!" />
        </RoleGate>
        <div className='flex items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin Only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className='flex items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin Only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>

      </CardContent>
    </Card>
  );
};

export default AdminPage;
