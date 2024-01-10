'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { useSearchParams } from 'next/navigation'

type Props = {}

const Social = (props: Props) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT })
  }

  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button size='lg' className='w-full' variant='outline' onClick={() => { }}>
        <FcGoogle onClick={() => onClick('google')} className="h-5 w-5" />
      </Button>
      <Button size='lg' className='w-full' variant='outline' onClick={() => { }}>
        <FaGithub onClick={() => onClick('github')} className="h-5 w-5" />
      </Button>
    </div>
  )
}

export default Social