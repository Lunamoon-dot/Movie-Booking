import React from 'react'
import { useNavigate } from 'react-router-dom'
import TimeFormat from './TimeFormat';
import { ArrowRight, Star } from 'lucide-react';

function MovieCard({movie}) {
const navigate = useNavigate();

  return (
    <div className='flex flex-col p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer w-66 ' onClick={()=> navigate(`/movie-detail/${movie._id}`)}>
      <img src={movie.backdrop_path} alt=""  className='rounded-xl object-cover h-45'/>
      <p>{movie.title}</p>
      <p className='font-light text-sm w-full flex gap-2 text-gray-300'>{new Date(movie.release_date).getFullYear()} •{' '}
          {movie.genres.slice(0,2).map((genre) =>genre.name).join(' | ')}{' '}•<TimeFormat movie ={movie}/>
        </p>
      <div className='flex items-center justify-between'>
         <button className=' flex text-[1rem] items-center justify-center w-30 px-2 py-2.5 gap-1 rounded-full cursor-pointer font-medium bg-primary hover:bg-primary-dull transition'>
            Buy Ticket 
            {/* aa */}
            {/* <ArrowRight className='w-4 h-auto'/>  */}
        </button>
        <div className='flex items-center justify-center gap-2'>
          <Star className='text-primary w-5 fill-primary'/>
          {`${Math.floor((movie.vote_average/2)*10)/10}/5`}
        </div>
      </div>
    </div>
  )
}

export default MovieCard