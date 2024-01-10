'use client';

import React, { useCallback, useEffect, useState } from 'react'
import CardWrapper from '@/components/auth/CardWrapper'
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/NewVerification';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';

type Props = {}

const NewVerificationForm = (props: Props) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Missing token!');
      return;
    };

    newVerification(token).then((data) => {
      setError(data.error);
      setSuccess(data.success);
    }).catch((err) => {
      setError('Something went wrong!');
    });
  }, [token, success, error]);

  useEffect(() => { onSubmit() }, [onSubmit]);

  return (
    <CardWrapper headerLabel='Confirming your authentication' backButtonHref='/auth/login' backButtonLabel='Back to login'>
      <div className='flex flex-col items-center w-full justify-center'>
        {!error && !success && (
          <BeatLoader className='mt-8' />
        )}
        <FormSuccess message={success} />
        {!success && (
          <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  )
}

export default NewVerificationForm