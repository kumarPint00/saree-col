'use client';
import Variant from '@/app/components/Admin/Variant/Variant';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <Variant/>
    </>
  )
}
export default page;