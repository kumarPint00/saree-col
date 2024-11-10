'use client';
import Refund from '@/app/components/Admin/Refund/Refund';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <Refund/>
    </>
  )
}
export default page;