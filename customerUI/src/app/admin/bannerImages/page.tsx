'use client';
import BannerImages from '@/app/components/Admin/BannerImage/BannerImages';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <BannerImages/>
    </>
  )
}
export default page;