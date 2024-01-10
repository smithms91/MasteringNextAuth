import UserInfo from '@/components/auth/UserInfo';
import { currentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import React from 'react'

type Props = {}

const ServerPage = async (props: Props) => {
  const user = await currentUser();

  return (
    <div>
      <UserInfo user={user} label="🖥️ Server Component!" />
    </div>
  )
}

export default ServerPage