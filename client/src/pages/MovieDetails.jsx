import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import FrontDetail from '../components/MovieDetail/FrontDetail';
import Cast from '../components/MovieDetail/Cast';
import DateSelect from '../components/MovieDetail/DateSelect';
import Loading from '../components/Loading';
import MoviesRecommendation from '../components/MoviesRecommendation'


function MovieDetails() {
  const {id} = useParams();
  const [show, setShow] = useState(null);

  const getShow = async ()=>{
    const showdetail = dummyShowsData.find(show => show._id === id);
    if (showdetail) {
      setShow({
        movie: showdetail,
        dateTime: dummyDateTimeData
      })
    } else {
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
    <div className='flex flex-col px-36 mt-30'>
     <FrontDetail show={show.movie}/>
     <Cast show={show.movie}/>
     <DateSelect id={id} dateTime={show.dateTime}/>   
    <MoviesRecommendation id ={id} movies ={dummyShowsData}/>
    </div>
  ) : (
    <Loading/>
  )
}

export default MovieDetails