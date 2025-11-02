import React from 'react'
import {ArrowRight} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MovieCard from './MovieCard';
import { useAppContext } from '../../context/appContext';

function FeatureSession() {
const navigate = useNavigate();
const {shows} = useAppContext();

  return (
    <div className='w-full flex flex-col items-center  px-36 pt-20'>
      {/* upper-part */}
      <div className='w-full flex justify-between items-center'>
        <p className='text-gray-300 font-medium text-2xl'>
          Now Showing
        </p>
        <button className='group flex gap-2 text-md text-gray-300 items-center cursor-pointer' onClick={()=>{scrollTo(0,0);navigate('/movies')}}>
            View All
          <ArrowRight className='w-4.5 h4.5 cursor-pointer group-hover:translate-x-1 transition' />
        </button>
      </div>

      {/* phim  */}
      <div className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 mt-8'>
        {shows.slice(0,4).map((movie, index) =><MovieCard key = {index} movie ={movie}/>)}
      </div>

      <button className='w-40 px-4.5 py-2 rounded-md cursor-pointer font-medium bg-primary hover:bg-primary/80 transition mt-[4.5rem]' onClick={()=>{scrollTo(0,0);navigate('/movies')}}>Show more</button>
    </div>
  )
}

export default FeatureSession