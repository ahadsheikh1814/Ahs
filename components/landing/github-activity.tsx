import React from 'react'
import Image from 'next/image'

const GithubActivity = () => {
    return (
        <div className='mt-5 relative  p-2 sm:p-4 md:p-6 overflow-hidden bg-accent/30 border-border/50 flex items-center gap-3 rounded-lg border text-sm shadow-inner'>
            <Image

                className='w-full'
                src="https://ghchart.rshah.org/ahadsheikh1814"
                alt="GitHub contribution graph"
                width={1000}
                height={200}
                unoptimized
            />
        </div>
    )
}

export default GithubActivity;