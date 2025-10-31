import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import { dateFormat } from '../../lib/DateFormat';
import toast from 'react-hot-toast';
import {useAppContext} from '../../../context/appContext'


function ListShows() {

  const {axios, getToken, user} = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchData = async ()=>{
   try {
    const token = await getToken();
    const {data} = await axios.get('/api/admin/all-shows',{headers:{
      Authorization: `Bearer ${token}`
    }})
    if(data.success){
      setShows(data.shows);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error('Failed to load shows');
    }  
   } catch (error) {
    console.error(error);
    toast.error('Fetching failed');
    setLoading(false);
   }
  
  }

  useEffect(()=>{
    if(user){
      fetchData()
    } else {
      setLoading(false);
    }
  }, [user]);

  
  return !loading ? (
    <div className='flex flex-col mt-10'>
       <p className='font-semibold text-2xl mb-8'>List Shows</p>
       <div className='max-w-4xl mt-6 overflow-x-auto'>

          <table className='w-full border-collapse rounded-md overflow-hidden'>
            <thead>
            <tr className='bg-primary/25 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium text-center'>Total Bookings</th>
              <th className='p-2 font-medium text-center'>Earnings</th>
            </tr>
            </thead>
            <tbody>
              {shows.map((show, index)=>(
                <tr key={index} className={`${index %2 === 0 ?'bg-primary/20':'bg-primary/15'}`}>
                  <td className='p-2 max-w-[180px] pl-5'>
                    <div className='truncate'>{show?.movie?.title || 'N/A'}</div>
                  </td>
                  <td className='p-2'>{show?.showDateTime ? dateFormat(show.showDateTime) : 'N/A'}</td>
                  <td className='p-2 text-center'>{show?.occupiedSeats ? Object.keys(show.occupiedSeats).length : 0}</td>
                  <td className='p-2 text-center'>{currency}{show?.occupiedSeats && show?.showPrice ? Object.keys(show.occupiedSeats).length * show.showPrice : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
    </div>
  ):<Loading/>
}

export default ListShows