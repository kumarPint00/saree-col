'use client';
import Pincode from '@/app/components/Admin/Pincode/Pincode';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <Pincode/>
    </>
  )
}
export default page;