import React from 'react'
import {Heart, Star} from 'lucide-react'
import TimeFormat from '../TimeFormat'
import { useAppContext } from '../../../context/appContext'

function FrontDetail({show}) {
  const {img_base_url, toggleFavorite, isFavorite, user} = useAppContext();
  const isMovieFavorite = isFavorite(show?._id);
  
  if (!show) {
    return <div>Loading movie details...</div>;
  }

  return (
      <div className='flex gap-4 max-md:flex-col'>
        <div className='flex items-center'>
                  <img src={img_base_url + show.poster_path} className='w-50 rounded-xl flex' alt=''/>
        </div>

        <div className='flex flex-col'>
           <p className='text-primary font-bold'>English</p>
           <p className='text-3xl mt-5'>{show.title}</p>
           <div className='flex items-center gap-1 mt-2'>
            <Star className='fill-primary text-primary w-5'/>
            <p className='text-sm'> {`${Math.floor((show.vote_average/2)*10)/10}/5`} {''}
            IMDb Rating</p>
           </div>
          
           <p className='font-light text-sm w-full flex gap-2 text-gray-300'>
              {new Date(show.release_date).getFullYear()} •{' '}
              {show.genres?.map((genre) =>genre.name).join(' | ')}{' '}•<TimeFormat movie ={show}/>
          </p>
          <p className='mt-4 font-light w-150'>
            {show.overview}
          </p>
          {/* button */}
          <div className='flex mt-5 items-center gap-4'>
            <button className='px-5 py-2  rounded-lg font-semibold transition-all duration-200 border-white border text-white hover:bg-white/20'>Watch Trailer</button>
            <button className='px-5 py-2 rounded-lg font-semibold transition-all duration-200 bg-primary text-white hover:bg-primary/50'>Buy Tickets</button>
            {user && (
              <button 
                onClick={() => toggleFavorite(show._id, show)}
                className='p-2 rounded-lg hover:bg-white/10 transition-all duration-200'
                title={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart 
                  className={`w-6 h-6 transition-all ${
                    isMovieFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      </div>
  )
}

export default FrontDetail