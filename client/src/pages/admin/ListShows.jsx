import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import { dateFormat } from '../../lib/DateFormat';

function ListShows() {
  const currency = import.meta.env.VITE_CURRENCY;
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async ()=>{
      try{

        setShows([{
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T15:30:00.000Z",
          showPrice:59,
          occupiedSeats:{
            A1:"user_1",
            B1:"user_2",
            C1:"user_3"
           }

        }])
      }
      catch(error){
        console.error(error);
      }
      finally{
        setLoading(false);
      }
  }

  useEffect(()=>{
    fetchData()
  }, []);
  return !loading ? (
    <div className='flex flex-col mt-10'>
       <p className='font-semibold text-2xl mb-8'>List Shows</p>
       <div className='max-w-4xl mt-6 overflow-x-auto'>

          <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
            <thead>
            <tr className='bg-primary/25 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
            </tr>
            </thead>
            <tbody>
              {shows.map((show, index)=>(
                <tr key={index} className={`${index %2 === 0 ?'bg-primary/20':'bg-primary/15'}`}>
                  <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
                  <td className='p-2'>{dateFormat(show.showDateTime)}</td>
                  <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
                  <td className='p-2'>{Object.keys(show.occupiedSeats).length * show.showPrice} {currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
    </div>
  ):<Loading/>
}

export default ListShows