import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import MovieDetails from './pages/MovieDetails'
import MyBooking from './pages/MyBooking'
import SeatLayout from './pages/SeatLayout'
import Footer from './components/Footer'
import Movies from './pages/Movies'
import {Toaster} from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import AddShows from './pages/admin/AddShows'
import { SignIn } from '@clerk/clerk-react'
import { useAppContext } from '../context/appContext'


function App() {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');
  const {user} = useAppContext();

  return (
    <div>
      <Toaster/>
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path='/'
         element={<Home/>}/>

         <Route path='movies' element ={<Movies/>}/>

        <Route path='/favorite'
         element={<Favorite/>}/>

        <Route path='/movie-detail/:id/:date'
         element={<MovieDetails/>}/>

        <Route path='/my-booking'
         element={<MyBooking/>}/>

        <Route path='/seat-layout/:id/:date'
         element={<SeatLayout/>}/>

         <Route path='/admin/*' element={user?<Layout/>:(
          <div className ='w-full min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'}/>
          </div>
         )}>
            <Route index element={<AdminDashboard/>}/>
            <Route path='add-shows' element={<AddShows/>} />
            <Route path='list-bookings' element={<ListBookings/>} />
            <Route path='list-shows' element={<ListShows/>} />
         </Route>
      </Routes>
      {!isAdminRoute && <Footer/>}
    </div>
  )
}

export default App 