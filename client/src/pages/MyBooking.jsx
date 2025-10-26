import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import { Star,Check } from 'lucide-react'
import { dateFormat } from '../lib/DateFormat'


function MyBooking() {
  const currency = import.meta.env.VITE_CURRENCY;
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyBookings = async () => {
    setBooking(dummyBookingData);
    setLoading(false);
  }

  useEffect(() => getMyBookings(), [])

  return !loading ? (
    <div className='flex flex-col items-center gap-8 mt-30'>
        <p className='text-3xl font-semibold'>My Booking</p>
      {booking.length === 0 ? (
        <div className='text-center text-gray-400 mt-12'>
          <p className='text-xl mb-2'>No bookings found</p>
          <p className='text-sm'>Your movie bookings will appear here</p>
        </div>
      ) : (
        booking.map((booking, index) => (
          <div key={index} className='w-full  max-w-4xl bg-primary/10 border border-primary/20 rounded-lg p-6 backdrop-blur-sm'>
            <div className='flex flex-col md:flex-row gap-6'>
              {/* Movie Poster */}
              <div className='shrink-0'>
                <img
                  src={booking.show.movie.poster_path}
                  alt={booking.show.movie.title}
                  className='w-60 h-auto aspect-video object-cover object-bottom rounded-lg'
                />   
                </div>
                
             <div className='w-full flex max-md:flex-col justify-between'>
                     {/* Movie Details And Smt */}
              <div className='flex flex-col justify-center'>
                <h3 className='text-2xl font-semibold text-white'>{booking.show.movie.title}</h3>

                {/* Rating */}
                <div className='flex items-center gap-2 mt-2 mb-8'>
                  <Star className='fill-primary text-primary w-5'/>
                  <span className='text-sm text-gray-300'>
                    {booking.show.movie.vote_average ? `${(booking.show.movie.vote_average / 2).toFixed(1)}/5` : 'N/A'}
                  </span>
                  <span className='text-sm text-gray-400'>IMDb Rating  •</span>
                  <span className='text-sm text-gray-400'>{new Date(booking.show.movie.release_date).getFullYear()}</span>
                </div>

                {/* Movie Info */}
                <div className='flex flex-wrap items-center gap-2 text-sm text-gray-300'>
                    {dateFormat(booking.show.showDateTime)}
                </div>
                </div>
                <div className='flex flex-col max-md:flex-row justify-between max-md:mt-5 h-full md:relative'>
                    <p className='text-2xl md:absolute top-0 right-0'>
                        {booking.show.showPrice}{currency}
                    </p>
                    <span></span> 
                        {!booking.isPaid && <button className='w-[7rem] md:absolute right-0 top-[30%] px-4.5 py-2 rounded-full cursor-pointer font-medium bg-primary hover:bg-primary-dull transition'>Pay Now</button>}
                        {booking.isPaid && <div className='flex text-sm text-primary justify-end items-center mt-10 gap-1'>Payment Completed <Check className='w-5 h-5'/></div>}
                    <div>
                        <p className='text-sm text-gray-400'>Total Tickets:{' '} <span className=' text-white text-[1rem]'>{booking.bookedSeats.length}</span></p>
                        <p className='text-sm text-gray-400'>{' '}Seat Number:<span className=' text-white'>{booking.bookedSeats.join(',')}</span></p>
                    </div>
               
                </div>
                </div>   
             
                
              </div>
            </div>
        ))
      )}
    </div>
  ) : <Loading/>
}

export default MyBooking 