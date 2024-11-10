'use client';
import Lookbook from '@/app/components/Admin/LookBook/LookBook';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <Lookbook/>
    </>
  )
}
export default page;