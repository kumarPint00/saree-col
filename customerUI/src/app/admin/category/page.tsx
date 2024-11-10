'use client';
import Category from '@/app/components/Admin/Category/Category';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <Category/>
    </>
  )
}
export default page;