import React from 'react'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Lock } from 'lucide-react'
type Props = {
  label: string
}

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

const Header = ({ label }: Props) => {
  return (
    <div className='w-full flex flex-col gap-y-4 mt-4 items-center justify-center'>
      <h1 className={cn('text-3xl font-semibold', font.className)}>🔐 Auth</h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  )
}

export default Header