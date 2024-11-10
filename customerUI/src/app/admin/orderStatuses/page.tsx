'use client';
import OrderStatuses from '@/app/components/Admin/OrderStatus/OrderStatus';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <OrderStatuses/>
    </>
  )
}
export default page;