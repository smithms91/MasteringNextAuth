'use client';

import React from 'react';
import { UserRole } from '@prisma/client';
import { useCurrentRole } from '@/hooks/useCurrentRole';
import FormError from '../FormError';

interface RoleGateProps {
  children?: React.ReactNode;
  allowedRole: UserRole
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <FormError message='You are not authorized to view this page.' />
  }

  return (
    <>
      {children}
    </>
  );
};

