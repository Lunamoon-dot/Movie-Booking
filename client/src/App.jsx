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
function App() {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

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

        <Route path='/movie-detail/:id'
         element={<MovieDetails/>}/>

        <Route path='/my-booking'
         element={<MyBooking/>}/>

        <Route path='/seat-layout/:id/:date'
         element={<SeatLayout/>}/>

      </Routes>
      {!isAdminRoute && <Footer/>}
    </div>
  )
}

export default App 