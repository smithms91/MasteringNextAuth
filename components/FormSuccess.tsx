import React from 'react'
import { AlertTriangle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

type Props = {
  message?: string
}

const FormSuccess = ({ message }: Props) => {
  if (!message) return null

  return (
    <div className='bg-emerald-500/15 p-3 mt-8 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'><CheckCircle2 className='h-4 w-4' />{message}</div>
  )
}

export default FormSuccess