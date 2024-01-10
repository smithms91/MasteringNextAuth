'use client';

import UserInfo from '@/components/auth/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import React from 'react'

type Props = {}

const ClientPage = (props: Props) => {
  const user = useCurrentUser();

  return (
    <div>
      <UserInfo user={user} label="🧑‍💻 Client Component!" />
    </div>
  )
}

export default ClientPage