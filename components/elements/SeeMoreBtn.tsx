"use client"
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

const SeeMoreBtn = ({children,link}:{children:React.ReactNode;link?: string}) => {
    const router = useRouter()
    const hendleClick = ()=>{
        if (link){
            router.push(link)
        }
    }
  return (
    <button 
    onClick={hendleClick}
    className='flex gap-1 cursor-pointer text-sm font-semibold text-neutral-900 dark:text-neutral-100 items-center'>
        {children}
        <ChevronDown/>
    </button>
  )
}

export default SeeMoreBtn