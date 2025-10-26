import React from 'react'
import { dummyDashboardData } from '../../assets/assets'
import {Tickets, HandCoins, TvMinimalPlay, Users} from 'lucide-react'
import { dateFormat } from '../../lib/DateFormat';

function AdminDashboard() {
  const currency = import.meta.env.VITE_CURRENCY;
 //Neen fetch Data ra ngoai truoc
  return (
    <div className='flex flex-col mt-10 pl-5 max-w-205'>
      <p className='font-semibold text-2xl mb-8'>Admin Dashboard</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8'>
        {/* TotalBooking part */}
        <div className=' flex items-center py-3 px-5 backdrop-blur bg-primary/20 overflow-hidden transition-[width] duration-300 border-primary border rounded-md gap-8'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm text-gray-200'>Total Bookings</p>
            <p className='text-xl'>{dummyDashboardData.totalBookings}</p>
          </div>
          <Tickets />
        </div>
        {/* Total Revenue*/}
        <div className=' flex items-center py-3 px-5 backdrop-blur bg-primary/20 overflow-hidden transition-[width] duration-300 border-primary border rounded-md gap-8'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm text-gray-200'>Total Revenue</p>
            <p className='text-xl'>{currency} {dummyDashboardData.totalRevenue}</p>
          </div>
          <HandCoins />
        </div>
        {/*Active Movies*/}
        <div className=' flex items-center py-3 px-5 backdrop-blur bg-primary/20 overflow-hidden transition-[width] duration-300 border-primary border rounded-md gap-8'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm text-gray-200'>Total Bookings</p>
            <p className='text-xl'>{dummyDashboardData.activeShows.length}</p>
          </div>
          <TvMinimalPlay />
        </div>
        {/*Total Users */}
         <div className=' flex items-center py-3 px-5 backdrop-blur bg-primary/20 overflow-hidden transition-[width] duration-300 border-primary border rounded-md gap-8'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm text-gray-200'>Total Users</p>
            <p className='text-xl'>{dummyDashboardData.totalUser}</p>
          </div>
          <Users />
        </div>
      </div>

      {/*Active movies Cards*/}
      <p className='font-bold text-2xl mb-8'>Active Movies</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-start gap-3'>
        {dummyDashboardData.activeShows.map((show,index)=>(
          <div key={index} className='flex flex-col backdrop-blur rounded-xl pb-5 bg-primary/20 hover:scale-105 cursor-pointer transition duration-300 ease-in-out'>
            <img src={show.movie.poster_path} alt="" className='h-60 obk object-cover  rounded-t-xl  w-full'/>

           <div className='flex flex-col pl-5 mt-3'>
              <p className='max-w-55 font-semibold text-xl truncate'>
              {show.movie.title}
              </p>
              <div className='font-semibold text-2xl'>
              {show.showPrice}{currency}
              </div>
              <div className='font-thin text-sm'>
              {dateFormat(show.showDateTime)}            
           </div>
              
              </div>
            </div>
       
        ))}

      </div>
    </div>
  )
}

export default AdminDashboard