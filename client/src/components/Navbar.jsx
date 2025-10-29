import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import{MenuIcon, Search, TicketPlus, XIcon} from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'


function Navbar() {
  const navigate =useNavigate();
  const {user} = useUser()
  const {openSignIn} = useClerk();

  const [menu, setMenu] = useState(false);
  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
        <Link to="/" className='max-md:flex-1 flex items-center'>
         <img src={assets.logo1} alt=""  className='w-20 h-auto'/>
         <p className='text-2xl text-'>OwlCinema</p>
        </Link>

        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${menu ? 'max-md:w-full ' : 'max-md:w-0'}`}>
        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={() =>setMenu(false)}/>
          {/* ScrollTo */}
          <NavLink to='/' onClick={()=> setMenu(false)}> Home</NavLink>
          <NavLink to='/movies' onClick={()=> setMenu(false)}> Movies</NavLink>
          <NavLink to='/' onClick={()=> setMenu(false)}> Theaters</NavLink>
          <NavLink to='/' onClick={()=> setMenu(false)}> Releases</NavLink>
          <NavLink to='/favorite' onClick={()=> setMenu(false)}> Favorites</NavLink>
        </div>

        <div className='flex gap-4 items-center'>
          <Search className='max-md:hidden cursor-pointer w-6 h-6'/>
          {!user ? (<button onClick={openSignIn} className='px-4.5 py-2 rounded-full cursor-pointer font-medium bg-primary hover:bg-primary-dull transition'>Login</button>)
          :
          (<UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label='My Booking' labelIcon={<TicketPlus width={15}/>} onClick={()=> navigate('/my-bookings')}/>
              </UserButton.MenuItems>
          </UserButton>) }
          
        </div>

        <MenuIcon className= 'sm:hidden w-6 h-6 cursor-pointer' onClick={()=>setMenu(true)}/>
    </div>
  )
}

export default Navbar