import React from 'react'
import {Heart, Star} from 'lucide-react'
import TimeFormat from '../TimeFormat'

function FrontDetail({show}) {
  if (!show) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div  className='flex flex-col'>
      <div className='flex'>
        <img src={show.poster_path} className='w-40 flex' alt=''/>
        <div className='flex flex-col'>
           <p>English</p>
           <p>{show.title}</p>
           <div className='flex items-center gap-1'>
            <Star className='fill-primary text-primary w-5'/>

            {`${Math.floor((show.vote_average/2)*10)/10}/5`} {''}
            IMDb Rating
           </div>
          
           <p className='font-light text-sm w-full flex gap-2 text-gray-300'>
              {new Date(show.release_date).getFullYear()} •{' '}
              {show.genres.map((genre) =>genre.name).join(' | ')}{' '}•<TimeFormat movie ={show}/>
          </p>
          <p>
            {show.overview}
          </p>
          {/* button */}
          <div className='flex'>
            <button>Watch Trailer</button>
            <button>Buy Tickets</button>
            <Heart/>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FrontDetail