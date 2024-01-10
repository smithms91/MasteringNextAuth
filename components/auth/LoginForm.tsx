'use client';

import React, { useState } from 'react'
import CardWrapper from './CardWrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { LoginSchema } from '@/schemas'
import * as z from 'zod'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import { login } from '@/actions/Login';
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Props = {}

const LoginForm = (props: Props) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with different provider' : ''

  const [isPending, startTransition] = useTransition()
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      login(values, callbackUrl).then((data) => {
        if (data?.error) {
          form.reset()
          setError(data?.error);
        }

        if (data?.success) {
          form.reset()
          setSuccess(data?.success)
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true)
        }

        setError(data?.error)
        setSuccess(data?.success)
      }).catch((error) => {
        setError('Something went wrong!')
      })
    })
  }

  return (
    <CardWrapper showSocial headerLabel='Welcome Back' backButtonLabel='Dont have an account?' backButtonHref='/auth/register'>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            {showTwoFactor && (
              <FormField control={form.control} name='code' render={({ field }) => (
                <FormItem>
                  <FormLabel>2FA Code</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder='123456' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            )}
            {!showTwoFactor && (
              <>
                <FormField control={form.control} name='email' render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder='john.doe@gmail.com' type='email' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name='password' render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder='******' type='password' />
                    </FormControl>
                    <Button size='sm' variant='link' asChild className='px-0 font-normal'>
                      <Link href='/auth/reset'>Forgot password?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )} />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type='submit' disabled={isPending} className='w-full'>{showTwoFactor ? 'Confirm' : 'Login'}</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm