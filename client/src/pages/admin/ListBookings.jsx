import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import { dateFormat2 } from '../../lib/DateFormat';
import {useAppContext} from '../../../context/appContext'
import toast from 'react-hot-toast';


function ListBookings() {
  const {axios, getToken, user} = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async ()=>{
    try {
      const token = await getToken();
      const {data} = await axios.get('/api/admin/all-bookings',{headers:{
        Authorization: `Bearer ${token}`
      }})
      if(data.success){
        setBookings(data.bookings);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error('Failed to load bookings');
      }  
    } catch (error) {
      console.error(error);
      toast.error('Fetching failed');
      setLoading(false);
    }
    
  }

  useEffect(()=>{
    if(user){
      fetchData()
    } else {
      setLoading(false);
    }
  }, [user]);
  return !loading ? (
    <div className='flex flex-col mt-10'>
       <p className='font-semibold text-2xl mb-8'>List Bookings</p>
       <div className='max-w-4xl mt-6 overflow-x-auto'>

          <table className='w-full border-collapse rounded-md overflow-hidden'>
            <thead>
            <tr className='bg-primary/30 text-left text-white'>
              <th className='p-2 font-medium pl-5'>User Name</th>
              <th className='p-2 font-medium'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Seats</th>
              <th className='p-2 font-medium text-center'>Amount</th>
            </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index)=>(
                <tr key={index} className={`${index %2 === 0 ?'bg-primary/20':'bg-primary/15'}`}>
                  <td className='p-2 min-w-45 pl-5'>{booking?.user?.name || 'N/A'}</td>
                  <td className='p-2 max-w-[180px]'>
                    <div className='truncate'>{booking?.show?.movie?.title || 'N/A'}</div>
                  </td>
                  <td className='p-2'>{booking?.show?.showDateTime ? dateFormat2(booking.show.showDateTime) : 'N/A'}</td>
                  <td className='p-2'>{booking?.bookedSeats?.join(', ') || 'N/A'}</td>
                  <td className='p-2 text-center'>{currency}{booking?.amount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
    </div>
  ):<Loading/>
}

export default ListBookings