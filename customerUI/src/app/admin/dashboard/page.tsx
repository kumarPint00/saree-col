'use client';
import Dashboard from '@/app/components/Admin/Dashboard/DashBorad';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <Dashboard/>
    </>
  )
}
export default page;