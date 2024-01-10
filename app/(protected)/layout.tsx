import React from 'react'
import Navbar from './_components/Navbar'

type Props = {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: Props) => {
  return (
    <div className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <Navbar />
      {children}
    </div>
  )
}

export default ProtectedLayout