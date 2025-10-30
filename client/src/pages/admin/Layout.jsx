import React from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../../context/appContext'
import Loading from '../../components/Loading'
function Layout() {
  const {isAdmin} = useAppContext();


  return isAdmin ? (
    <div className='flex flex-col'>
      <div className='flex min-h-screen'>
        <AdminSidebar/>
        <div className='flex-1 ml-95 max-w-full overflow-x-auto'>
          <div className='w-full mx-auto'>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  ):(<Loading/>)
}

export default Layout