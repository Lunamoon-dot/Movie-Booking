import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../../context/appContext'

function AdminSidebar() {
  const { user } = useAppContext()
  
  return (
    <div className='fixed top-0 left-0 items-center h-screen backdrop-blur bg-black/30 overflow-hidden transition-[width] duration-300 w-[280px] border-r-primary/50 border-r'>
      <div className='flex flex-col items-center justify-center p-5'>
        <img 
          src={user?.imageUrl || assets.profile} 
          alt="Admin Profile"  
          className='w-20 h-20 rounded-full mb-2 object-cover'
        />
        <p className='font-semibold'>{user?.fullName || user?.firstName || 'Admin'}</p>
        {user?.primaryEmailAddress?.emailAddress && (
          <p className='text-xs text-gray-400 mt-1'>{user.primaryEmailAddress.emailAddress}</p>
        )}
      </div>

      <div className='w-full flex items-center justify-center'>
       <hr className='w-[90%] text-primary/50'/>
      </div>
      <div className='flex flex-col space-y-3 w-[95%] mt-5 items-center'>
        {/* end la thu vo cung quan */}
        <NavLink to='/admin' end className={({isActive})=>`w-[90%] flex items-center py-3 rounded-md pl-[4%] gap-1 ${isActive?
          'bg-primary'
          :'cursor-pointer hover:bg-primary/30'} transform-all duration-300 ease-in-out`}>Dashboard</NavLink>
        <NavLink to='/admin/add-shows' className={({isActive})=>`w-[90%] flex items-center py-3 rounded-md pl-[4%] gap-1 ${isActive?
          'bg-primary'
          :'cursor-pointer hover:bg-primary/30'} transform-all duration-300 ease-in-out`}>Add Shows</NavLink>
        <NavLink to='/admin/list-bookings'  className={({isActive})=>`w-[90%] flex items-center py-3 rounded-md pl-[4%] gap-1 ${isActive?
          'bg-primary'
          :'cursor-pointer hover:bg-primary/30'} transform-all duration-300 ease-in-out`}>List Bookings</NavLink>
        <NavLink to='/admin/list-shows'  className={({isActive})=>`w-[90%] flex items-center py-3 rounded-md pl-[4%] gap-1 ${isActive?
          'bg-primary'
          :'cursor-pointer hover:bg-primary/30'} transform-all duration-300 ease-in-out`}>List Shows</NavLink>
          {/*Nên tạo 1 file riêng*/}
      </div>

    </div>
  )
}

export default AdminSidebar

