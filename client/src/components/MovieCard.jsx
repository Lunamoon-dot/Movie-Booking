import React from 'react'
import { useNavigate } from 'react-router-dom'
import TimeFormat from './TimeFormat';
import { ArrowRight, Star, Heart } from 'lucide-react';
import { useAppContext } from '../../context/appContext';

function MovieCard({movie}) {
const navigate = useNavigate();
const {img_base_url, toggleFavorite, isFavorite, user} = useAppContext();
const isMovieFavorite = isFavorite(movie._id);

const handleFavoriteClick = (e) => {
  e.stopPropagation(); // Prevent navigation when clicking heart
  toggleFavorite(movie._id, movie);
};

  return (
    <div className='flex flex-col ju p-3 bg-zinc-800 rounded-2xl hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer w-60 ' onClick={()=> navigate(`/movie-detail/${movie._id}/1`)}>
      <div className='relative'>
        <img src={img_base_url + movie.backdrop_path} alt=""  className='rounded-xl object-cover h-45'/>
        {user && (
          <button
            onClick={handleFavoriteClick}
            className='absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-all'
            title={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`w-4 h-4 transition-all ${
                isMovieFavorite ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </button>
        )}
      </div>
      <p className='text-xl font-semibold mt-3'>{movie.title}</p>
      <p className='font-light text-sm w-full flex gap-2 text-gray-300 mt-1'>{new Date(movie.release_date).getFullYear()} •{' '}
          {movie.genres?.slice(0,2).map((genre) =>genre.name).join(' | ')}{' '}•<TimeFormat movie ={movie}/>
        </p>
      <div className='flex items-center justify-between mt-auto pt-4'>
         <button
           className='flex text-[1rem] items-center justify-center w-30 px-2 py-2.5 gap-1 rounded-full cursor-pointer font-medium transition ease-in-out duration-300 transform hover:scale-102 hover:brightness-110'
           style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-second))' }}
         >
            Buy Ticket 
            {/* aa */}
            <ArrowRight className='w-4 h-auto font-bold'/> 
        </button>
        <div className='flex items-center justify-center gap-1'>
          <Star className='text-primary w-4 fill-primary'/>
          <p className='text-sm'> {`${Math.floor((movie.vote_average/2)*10)/10}/5`} </p>
         
        </div>
      </div>
    </div>
  )
}

export default MovieCard