'use client';

import React from 'react'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import Header from './Header';
import Social from './Social';
import BackButton from './BackButton';

type Props = {
  children: React.ReactNode,
  headerLabel: string,
  backButtonLabel: string,
  backButtonHref: string,
  showSocial?: boolean
}

const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial }: Props) => {
  return (
    <Card className='w-[400px] shadow-md'>
      <Header label={headerLabel} />
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}

export default CardWrapper