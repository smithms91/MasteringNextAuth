import React from 'react'
import { AlertTriangle } from "lucide-react";

type Props = {
  message?: string
}

const FormError = ({ message }: Props) => {
  if (!message) return null

  return (
    <div className='bg-destructive/15 p-3 mt-8 rounded-md flex items-center gap-x-2 text-sm text-destructive'><AlertTriangle className='h-4 w-4' />{message}</div>
  )
}

export default FormError