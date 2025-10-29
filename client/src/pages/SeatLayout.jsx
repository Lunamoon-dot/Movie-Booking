import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loading from '../components/Loading'
import { ArrowRight, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

function SeatLayout() {
  const {id, date} = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  const groupRows = [["A", "B","C", "D","E"],["F", "G", "H", "I", "J"]];

  const getShow = async()=>{
    const show = dummyShowsData.find( show => show._id === id);
    if(show){
      setShow({
        movie:show,
        dateTime: dummyDateTimeData,
      })
    }
  }

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error("Please select time first");
    }
  
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast.error("You can only select 5 seats");
    }
  
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };
  

  const renderSeats = (row, count = 8)=>(
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({length: count}, (_,i)=>{
          const seatId = `${row}${i+1}`
          return (
            <button onClick={()=>handleSeatClick(seatId)} className={`flex w-10 h-10 px-3 py-3 border border-second text-second-dull cursor-pointer transition duration-300 ease-in-out rounded-xl justify-center font-semibold ${selectedSeats.includes(seatId) ?'bg-primary text-white':''} `}>
              {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )

  useEffect(()=>{
    getShow()
  }, []);

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-40'>
      {/*Time Choosing*/}
      <div className='flex flex-col gap-8 w-70'>
        <div className='flex items-center justify-center gap-2'>
         <p className='font-medium text-xl'>Available Timings</p>
         <Clock strokeWidth={2.5} width={20}/>
        </div>
       
        <div className='grid-cols-2 grid gap-3 bg-primary/20 rounded-2xl px-6 py-5'>
         {show.dateTime[date].map((datetime) =>(
          <div onClick={()=> setSelectedTime(datetime)} key={datetime.time} className={`flex px-3 py-3 border border-second text-second-dull cursor-pointer transition duration-300 ease-in-out rounded-xl justify-center font-semibold ${selectedTime?.time === datetime.time ?'bg-primary text-white':'hover:bg-primary/20'}`}>
            <p className='text-sm'>{new Date(datetime.time).toLocaleTimeString("en-US", {
                                                              hour: '2-digit',
                                                              minute: '2-digit'})}
            </p>
          </div>
        ))}          
        </div>
      </div>
      {/*Seat Layout*/}
  <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
  <p className='font-medium text-2xl mb-4'>Select Your Seat</p>
  <img src={assets.screenicon} alt="" className='w-180 h-5 object-cover' />
  <p className='text-sm font-thin mb-6'>Screen Side</p>

  <div className='grid grid-cols-2 gap-12 mt-10 text-xs text-gray-300'>
    {/* Cột trái */}
    <div className='flex flex-col items-center space-y-2'>
      {groupRows[0].map((row) => renderSeats(row))}
    </div>

    {/* Cột phải */}
    <div className='flex flex-col items-center space-y-2'>
      {groupRows[1].map((row) => renderSeats(row))}
    </div>
  </div>
  <button  disabled={!selectedSeats.length || !selectedTime} onClick={()=> navigate('/my-booking')} className={`flex mt-15 items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-primary cursor-pointer hover:bg-primary-dull transition duration-300 ease-in-out ${!selectedSeats.length || !selectedTime ?'opacity-50' : ''}`}> Process to checkout <ArrowRight/></button>
</div>
</div>
  ):(<Loading/>)
}

export default SeatLayout