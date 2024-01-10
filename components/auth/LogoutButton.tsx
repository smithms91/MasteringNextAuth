"use client"

import React from 'react'
import { logout } from '@/actions/Logout'

type Props = {
  children?: React.ReactNode,
}

const LogoutButton = ({ children }: Props) => {
  const onClick = () => {
    logout()
  }

  return (
    <span onClick={onClick} className='cursor-pointer'>{children}</span>
  )
}

export default LogoutButton