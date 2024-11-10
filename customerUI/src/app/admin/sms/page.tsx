'use client';
import SMS from '@/app/components/Admin/SMS/Sms';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <SMS/>
    </>
  )
}
export default page;