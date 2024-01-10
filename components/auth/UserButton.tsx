'use client';

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

import { CircleUserRound, LogOut } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import LogoutButton from './LogoutButton';

type Props = {}

const UserButton = (props: Props) => {
  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='cursor-pointer'>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback className='bg-sky-400'><CircleUserRound color="white" /></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align='end'>
        <LogoutButton>
          <DropdownMenuItem><LogOut className='h-4 w-4 mr-2' />Logout</DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton