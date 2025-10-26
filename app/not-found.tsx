import H1 from '@/components/elements/H1'
import HighLightText from '@/components/elements/HighLightText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const notFound = () => {
  return (
    <div className='min-h-[80vh] flex flex-col gap-2 justify-center items-center'>
        <H1>
          <span className='text-9xl'>404</span>
        </H1>
        <HighLightText>
          <span>This page could not be found.</span>
        </HighLightText>
        <Button className='mt-2'>
          <Link href={'/'} className='font-semibold'>Go to home</Link>
        </Button>
    </div>
  )
}

export default notFound