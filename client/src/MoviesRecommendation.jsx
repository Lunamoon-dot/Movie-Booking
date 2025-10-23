import React from 'react'

function MoviesRecommendation({movie}) {
  return (
    <div>
        <p>Recommend Movies</p>
        <div className='grid grid-cols-4 max-md:grid-cols-2 justify-center'>
            {movie.slice(0,4).map((movie, index)=>(
                <div key={index} className='flex flex-col gap-2'>
                   <img src={movie.backdrop_path} alt=""  className='rounded-xl object-cover h-60'/> 
                     <p>{movie.title}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MoviesRecommendation