'use client';
import ProductAddition from '@/app/components/Admin/Product/Product';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <ProductAddition/>
    </>
  )
}
export default page;