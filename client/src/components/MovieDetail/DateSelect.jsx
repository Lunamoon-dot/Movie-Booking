import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function DateSelect({dateTime, id}) {
 const [selected, setSelected] = useState(null)
 const navigate = useNavigate();
 const onBookHandler = ()=>{
  if(!selected){
    return toast.error('Please select a date')
  }
  // hinh nhu la sit-layout
  navigate(`/seat-layout/${id}/${selected}`)
  window.scrollTo(0, 0)
 }

  return (
    <div id='DateSelect' className='flex flex-col gap-8 px-8 py-8 rounded-xl overflow-hidden transition-[width] duration-300 mt-8 mb-8 backdrop-blur-md bg-primary/20'>
      {/* Header */}
      <p className="ml-10 text-xl font-semibold text-white">Choose Date</p>

      {/* Date Selection */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6'>
        <div className='flex items-center gap-6 text-sm'>
          <ChevronLeftIcon width={28} className="text-primary cursor-pointer hover:text-primary/80 transition-colors"/>
          <div className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
            {Object.keys(dateTime).map((date)=>(
              <button
                key={date}
                onClick={() => setSelected(date)}
                className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg border-2 transition-all duration-200 ${
                  selected === date
                    ? 'border-primary/60 bg-primary text-white'
                    : 'border-primary hover:bg-primary/20 hover:border-primary/50'
                }`}
              >
                <span className="text-lg font-semibold">
                  {new Date(date).getDate()}
                </span>
                <span className="text-xs">
                  {new Date(date).toLocaleDateString("en-US", {month:"short"})}
                </span>
              </button>
            ))}
          </div>
          <ChevronRightIcon width={28} className="text-primary cursor-pointer hover:text-primary/80 transition-colors"/>
        </div>

        <button
          onClick={() => onBookHandler()}
          className='px-8 py-3 rounded-lg font-semibold transition-all duration-200 bg-primary text-white hover:bg-primary/50' >
          Book Now
        </button>
      </div>
    </div>
  )
}
