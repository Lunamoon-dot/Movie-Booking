import React from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='flex flex-col'>
   {/* co the co nav o day */}
      <div className='flex min-h-screen'>
        <AdminSidebar/>
        <div className='flex-1 ml-95 max-w-full overflow-x-auto'>
          <div className='w-full mx-auto'>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout