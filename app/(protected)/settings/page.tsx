'use client';

import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { settings } from '@/actions/Settings';
import { useSession } from 'next-auth/react'
import { useTransition } from 'react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SettingsSchema } from '@/schemas';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
import { Form, FormField, FormControl, FormLabel, FormDescription, FormMessage, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { UserRole } from '@prisma/client';

const SettingsPage = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const user = useCurrentUser();

  const { update } = useSession()

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update()
            setSuccess(data.success)
          }
        }).catch((error) => {
          setError('Something went wrong!')
        });
    })
  }

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
    }
  });

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <FormField control={form.control} name="name" render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }} />
              {user?.isOAuth == false && (
                <>
                  <FormField control={form.control} name="email" render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="johndoe@example.com" type="email" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }} />
                  <FormField control={form.control} name="password" render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="******" type="password" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }} />
                  <FormField control={form.control} name="newPassword" render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="******" type="password" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }} />
                </>
              )}
              <FormField control={form.control} name="role" render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }} />
              {user?.isOAuth == false && (
                <FormField control={form.control} name="isTwoFactorEnabled" render={({ field }) => {
                  return (
                    <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
                      <div className='space-y-0.5'>
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>Enable Two Factor Authentication for your account.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )
                }} />
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type='submit' disabled={isPending}>Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingsPage