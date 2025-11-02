import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FrontDetail from '../components/MovieDetail/FrontDetail';
import Cast from '../components/MovieDetail/Cast';
import DateSelect from '../components/MovieDetail/DateSelect';
import Loading from '../components/Loading';
import MoviesRecommendation from '../components/MoviesRecommendation'
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';


function MovieDetails() {
  const {id} = useParams();
  const [show, setShow] = useState(null);
  const {axios, shows} = useAppContext();

  const getShow = async ()=>{
    try {
      const {data} = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow({
          movie: data.movie,
          dateTime: data.dateTime
        })
      } else {
        toast.error(data.message);
        setShow(null);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch movie details');
      setShow(null);
    }
  }

  useEffect(() => {
    if (id) {
      getShow()
    } else {
      setShow(null);
    }

    // Cleanup function to reset state when component unmounts or id changes
    return () => {
      setShow(null);
    }
  }, [id])

  return show ? (
    <div className='flex flex-col px-36 mt-30 bg-bg-main min-h-screen'>
     <FrontDetail show={show.movie}/>
     <Cast show={show.movie}/>
     <DateSelect id={id} dateTime={show.dateTime}/>   
    <MoviesRecommendation id ={id} movies ={shows}/>
    </div>
  ) : (
    <Loading/>
  )
}

export default MovieDetails