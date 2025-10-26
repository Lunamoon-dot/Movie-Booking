import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useState } from 'react'

export default function Cast({show}) {
  const [limit, setLimit]= useState(6);
  const [arrow, setArrow] = useState(true);
  return (
    <div className='mt-8 mb-8'>
      <p className='font-semibold text-2xl '>
        Movie Cast
      </p>
      <div className='flex flex-wrap items-center justify-start gap-3 relative mt-4'>
        {show.casts.slice(0, limit).map((cast,index)=>(
          <div key={index} className='flex'>
            <div className='flex flex-col items-center'>
              <img src={cast.profile_path} alt="" className='w-20 rounded-full aspect-square object-cover'/>
              <p>{cast.name}</p>
            </div>
          </div>
        ) )}
        <ArrowRight className={`${arrow == false && 'hidden'} size-8 bg-primary w-10 h-10 px-1 rounded-full cursor-pointer hover:bg-primary-dull`} onClick={()=> {setLimit(show.casts.length); setArrow(false)}}/>
        <ArrowLeft className={`${arrow == true && 'hidden'} size-8 bg-primary w-10 h-10 px-1 rounded-full cursor-pointer hover:bg-primary-dull`} onClick={()=> {setLimit(6); setArrow(true)}}/>
      </div>
    </div>
  )
}
