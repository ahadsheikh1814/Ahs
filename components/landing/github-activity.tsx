import React from 'react'
import Image from 'next/image'

const GithubActivity = () => {
  return (
    <div className="mt-5 p-3 sm:p-4 overflow-hidden bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 rounded-lg">
      
      {/* Fix: relative wrapper with explicit aspect ratio so image scales correctly */}
      <div className="relative w-full h-auto min-h-[80px] sm:min-h-[120px]">
        <Image
          src="https://ghchart.rshah.org/ahadsheikh1814"
          alt="GitHub contribution graph"
          width={1000}
          height={200}
          // Fix: w-full h-auto lets the image scale naturally within the container
          className="w-full h-auto"
          unoptimized
        />
      </div>
    </div>
  )
}

export default GithubActivity