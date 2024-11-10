'use client';
import Colors from '@/app/components/Admin/Colors/ColorAdd';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <Colors/>
    </>
  )
}
export default page;