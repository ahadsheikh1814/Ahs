import H1 from '@/components/elements/H1'
import HighLightText from '@/components/elements/HighLightText'
import ResourcesCard from '@/components/landing/ResourcesCard'
import {Resources} from '@/lib/resources'
import React from 'react'

const resources = () => {
  return (
    <div>
      <H1>Resources</H1>
      <div className="flex gap-2"><HighLightText>Websites that help me lot</HighLightText> in my work</div>
      <div className='mt-5 grid gap-10 md:grid-cols-2'>
        {Resources.map((itm,idx)=>(
          <ResourcesCard
          key={idx}
          title={itm.title}
          description={itm.description}
          link={itm.link}
          linkText={itm.linkText}
          />
        ))}
      </div>
    </div>
  )
}

export default resources