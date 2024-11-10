'use client';
import Coupons from '@/app/components/Admin/Coupon/Coupon';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <Coupons/>
    </>
  )
}
export default page;