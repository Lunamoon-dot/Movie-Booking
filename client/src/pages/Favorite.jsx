import React from 'react'
import { useAppContext } from '../../context/appContext'
import MovieCard from '../components/MovieCard'
import { Heart } from 'lucide-react'

function Favorite() {
  const { favorites, user } = useAppContext()

  if (!user) {
    return (
      <div className='mt-30 h-[65vh] flex flex-col items-center justify-center'>
        <Heart className='w-16 h-16 text-gray-500 mb-4' />
        <h2 className='text-2xl font-semibold mb-2'>Please Sign In</h2>
        <p className='text-gray-400'>Sign in to view your favorite movies</p>
      </div>
    )
  }

  return favorites.length > 0 ? (
    <div className='mt-30 h-auto flex flex-col items-center'>
      <div className='w-280 flex justify-between'>
        <div className='flex items-center gap-3'>
          <Heart className='w-7 h-7 text-primary fill-primary' />
          <p className='font-medium text-3xl'>My Favorites</p>
        </div>
        <span></span>
      </div>
     
      <div className='mt-15 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4'>
        {favorites.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <div className='mt-30 h-auto flex flex-col items-center justify-center'>
      <Heart className='w-16 h-16 text-gray-600 mb-4' />
      <h2 className='text-xl font-semibold mb-2 text-gray-300'>No Favorites Yet</h2>
      <p className='text-gray-400'>Start adding movies to your favorites by clicking the heart icon</p>
    </div>
  )
}

export default Favorite