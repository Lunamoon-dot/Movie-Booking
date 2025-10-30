import React, { useEffect, useState } from 'react'
import {Tickets, HandCoins, TvMinimalPlay, Users} from 'lucide-react'
import { dateFormat } from '../../lib/DateFormat';
import {useAppContext} from '../../../context/appContext'
import Loading from '../../components/Loading'
import toast from 'react-hot-toast';

function AdminDashboard() {
  const {axios, getToken, user, img_base_url} = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;
 //Neen fetch Data ra ngoai truoc
 const [dashboard, setDashboard] = useState({});
 const [loading, setLoading] = useState(false);

 const fetchData = async ()=>{
  try {
    const token = await getToken();
    const {data} = await axios.get('/api/admin/dashboard', {headers:{
      Authorization: `Bearer ${token}`
    }})
    if(data.success){
      setDashboard(data.dashboardData)
      setLoading(true);
    }
  } catch (error) {
    console.error(error);
    toast.error('Fetching failed')
  }
 }

 useEffect(()=>{
  if(user){
  fetchData()
  }}, [])

  return loading? (
    <div className='flex flex-col mt-10 pl-5 max-w-205'>
      <p className='font-semibold text-2xl mb-8'>Admin Dashboard</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8'>
        {/* TotalBooking part */}
        <div className=' flex items-center py-3 px-5 backdrop-blur bg-primary/20 overflow-hidden transition-[width] duration-300 border-primary border rounded-md gap-8'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm text-gray-200'>Total Bookings</p>
            <p className='text-xl'>{dashboard.totalBookings || 0}</p>
          </div>
          <Tickets />
        </div>
        {/* Total Revenue*/}
        <div className=' flex items-center py-3 px-5 backdrop-blur bg-primary/20 overflow-hidden transition-[width] duration-300 border-primary border rounded-md gap-8'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm text-gray-200'>Total Revenue</p>
            <p className='text-xl'>{currency}{dashboard.totalRevenue || 0}</p>
          </div>
          <HandCoins />
        </div>
        {/*Active Movies*/}
        <div className=' flex items-center py-3 px-5 backdrop-blur bg-primary/20 overflow-hidden transition-[width] duration-300 border-primary border rounded-md gap-8'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm text-gray-200'>Active Shows</p>
            <p className='text-xl'>{dashboard.activeShows?.length || 0}</p>
          </div>
          <TvMinimalPlay />
        </div>
        {/*Total Users */}
         <div className=' flex items-center py-3 px-5 backdrop-blur bg-primary/20 overflow-hidden transition-[width] duration-300 border-primary border rounded-md gap-8'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm text-gray-200'>Total Users</p>
            <p className='text-xl'>{dashboard.totalUsers || 0}</p>
          </div>
          <Users />
        </div>
      </div>

      {/*Active movies Cards*/}
      <p className='font-bold text-2xl mb-8'>Active Movies</p>
      <div className='overflow-y-auto scrollbar-hide  h-screen py-3 px-3'>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-start gap-3'>
        {dashboard.activeShows?.map((show,index)=>(
          <div key={index} className='flex flex-col backdrop-blur rounded-xl pb-5 bg-primary/20 hover:scale-105 cursor-pointer transition duration-300 ease-in-out'>
            <img src={img_base_url + show.movie.poster_path} alt="" className='h-60 obk object-cover  rounded-t-xl  w-full'/>

           <div className='flex flex-col pl-5 mt-3'>
              <p className='max-w-55 font-semibold text-xl truncate'>
              {show.movie.title}
              </p>
              <div className='font-semibold text-2xl'>
              {currency}{show.showPrice}
              </div>
              <div className='font-thin text-sm'>
              {dateFormat(show.showDateTime)}            
           </div>
              
              </div>
            </div>
       
        ))}

      </div>
      </div>
      
    </div>
  ):(<Loading/>)
}

export default AdminDashboard