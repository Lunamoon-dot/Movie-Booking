import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { Star,Check } from 'lucide-react'
import { dateFormat } from '../lib/DateFormat'  
import { useAppContext } from '../../context/appContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


function MyBooking() {
  const {axios, getToken, user,img_base_url} = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyBookings = async () => {
      try {
        const token = await getToken();
        const {data} = await axios.get('/api/user/bookings', {headers:{
          Authorization: `Bearer ${token}`
        }})
        if(data.success){
          setBookings(data.booking || [])
        }
         setLoading(false)
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error(error.message || 'Failed to fetch bookings');
      } 
  }

  useEffect(() =>{
    if(user){ 
      getMyBookings()
    }
  }, [user])

  return !loading ? (
    <div className='w-full min-h-screen flex justify-center px-4 md:px-8 lg:px-12'>
      <div className='w-full max-w-4xl flex flex-col gap-8 items-center'>
        <p className='text-3xl font-semibold text-center mt-30'>My Booking</p>
        {bookings.length === 0 ? (
          <div className='text-center text-gray-400'>
            <p className='text-xl mb-2'>No bookings found</p>
            <p className='text-sm'>Your movie bookings will appear here</p>
          </div>
        ) : (
        <div className='flex flex-col gap-4 w-full'>
          {bookings.map((booking, index) => (
            <div key={index} className='w-full bg-primary/10 border border-primary/20 rounded-lg p-6 backdrop-blur-sm'>
            <div className='flex flex-col md:flex-row gap-6'>
              {/* Movie Poster */}
              <div className='shrink-0'>
                <img
                  src={img_base_url + booking.show.movie.poster_path}
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
                        {currency}{booking.show.showPrice}
                    </p>
                    <span></span> 
                        {!booking.isPaid && <Link  to={booking.paymentLink} className='w-28 md:absolute right-0 top-[30%] px-4.5 py-2 text-center rounded-full cursor-pointer font-medium bg-primary hover:bg-primary-dull transition'>Pay Now</Link>}
                        {booking.isPaid && <div className='flex text-sm text-primary justify-end items-center mt-10 gap-1'>Payment Completed <Check className='w-5 h-5'/>
                        </div>}
                    <div>
                        <p className='text-sm text-gray-400'>Total Tickets:{' '} <span className=' text-white text-[1rem]'>{booking.bookedSeats.length}</span></p>
                        <p className='text-sm text-gray-400'>{' '}Seat Number:<span className=' text-white'>{booking.bookedSeats.join(',')}</span></p>
                    </div>
               
                </div>
                </div>   
             
                
              </div>
            </div>
          ))}</div>
        )}
      </div>
    </div>
  ) : <Loading/>
}

export default MyBooking 