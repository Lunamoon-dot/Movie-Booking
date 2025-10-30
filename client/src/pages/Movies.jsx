import React, { useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import { useAppContext } from '../../context/appContext';

function Movies() {
     const {shows} = useAppContext();
     const movies = shows;
     
     useEffect(() => {
       console.log('Movies data:', movies);
     }, [movies]);
  return movies.length > 0 ? (
    <div className='mt-30 h-auto flex flex-col items-center'>
      <div className='w-280 flex justify-between'>
      <p className='font-medium text-3xl'>
        Avilable Movies
      </p>
      <span></span>
      </div>
     
      <div className='mt-15 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4'>
         {movies.map((movie)=> <MovieCard key={movie._id} movie = {movie}/>)}
      </div>
    </div>
  ):
  (
    <div>
      Not Avilable
    </div>
  )
}

export default Movies