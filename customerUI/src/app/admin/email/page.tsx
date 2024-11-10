'use client';
import Email from '@/app/components/Admin/Email/Email';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <Email/>
    </>
  )
}
export default page;