'use client';
import BlogPost from '@/app/components/Admin/Blog/BlogPost';
import React, { FC } from 'react'
export interface pageProps {
    text?: string
}

const page: FC<pageProps> = ( props ) => {

  return (
    <>
     <BlogPost/>
    </>)
}
export default page;