'use client';
import PaymentStatus from '@/app/components/Admin/PaymentStatus/PaymentStatus';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <PaymentStatus/>
    </>
  )
}
export default page;