import React from 'react'
import CardWrapper from '@/components/auth/CardWrapper'
import { AlertTriangle } from 'lucide-react'
type Props = {}

const ErrorCard = (props: Props) => {
  return (
    <CardWrapper headerLabel="Oops! Something went wrong!" backButtonHref='/auth/login' backButtonLabel='Back to login'>
      <div className='text-destructive mt-8 flex items-center justify-center w-full'>
        <AlertTriangle />
      </div>
    </CardWrapper>
  )
}

export default ErrorCard