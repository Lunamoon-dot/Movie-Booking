import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets} from '../assets/assets';
import Loading from '../components/Loading'
import { ArrowRight, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/appContext'

function SeatLayout() {
  const { axios, getToken, user} = useAppContext();

  const {id, date} = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  const [occupiedSeats, setOccupiedSeats] = useState([])

  const groupRows = [["A", "B","C", "D","E"],["F", "G", "H", "I", "J"]];
  
  // Lấy dữ liệu của phim
  const getShow = async()=>{
    try{
      const token = getToken();
      const {data} = await axios.get(`/api/show/${id}`,  {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if(data.success){
        setShow({
          movie: data.movie,
          dateTime: data.dateTime
        });
      }
    } catch(error){
      console.log(error);
      toast.error("Failed to load show details");
    }
  }

// SỬA LỖI: Lấy dữ liệu ghế đã đặt theo showId cụ thể
  const getOccupiedSeats = async(showId)=>{
    if (!showId) {
        setOccupiedSeats([]);
        return;
    }
    try {
      const token = await getToken();
      // Dùng showId thay vì id của phim
      const {data} = await axios.get(`/api/booking/seat/${showId}`,  {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(data.success){
        setOccupiedSeats(data.occupiedSeats)
      } else {
           setOccupiedSeats([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load occupied seats");
       setOccupiedSeats([]);
    }
  }

 // Tạo booking
  const createBooking = async()=>{
    try{
      if(!selectedSeats.length || !selectedTime){
        return toast.error("Please select seats and time");
      }
      if(!user){
        toast('Please Sign In!')
      }
      const token = await getToken();
      const {data} = await axios.post('/api/booking/create', {
        showId: selectedTime.showId,
        selectedSeats: selectedSeats
      }, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if(data.success){
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch(error){
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create booking");
    }
  }

// Thêm hàm xử lý khi chọn giờ chiếu
const handleTimeSelect = (datetime) => {
    setSelectedTime(datetime);
    setSelectedSeats([]); // Reset ghế đã chọn khi đổi giờ
    // Tải ghế đã đặt theo showId
    if (datetime && datetime.showId) {
        getOccupiedSeats(datetime.showId);
    }
};

// Sửa LỖI: Logic chọn/bỏ chọn ghế
  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }
  
    setSelectedSeats((prev) => {
        if (prev.includes(seatId)) {
            // Bỏ chọn ghế
            return prev.filter((seat) => seat !== seatId);
        } else {
            // Kiểm tra giới hạn 5 ghế trước khi thêm
            if (prev.length >= 5) {
                toast("You can only select 5 seats");
                return prev;
            }
            // Thêm ghế mới
            return [...prev, seatId];
        }
    });
  };
  

// SỬA LỖI: Logic render ghế (disabled và màu sắc)
  const renderSeats = (row, count = 8)=>(
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({length: count}, (_,i)=>{
          const seatId = `${row}${i+1}`
          const isOccupied = occupiedSeats.includes(seatId); // Ghế đã đặt
          const isSelected = selectedSeats.includes(seatId); // Ghế đang chọn
          
          return (
            <button 
              // Vô hiệu hóa chức năng cho ghế đã đặt
              disabled={isOccupied} 
              onClick={()=>handleSeatClick(seatId)} 
              className={`flex w-10 h-10 px-3 py-3 border rounded-xl justify-center font-semibold transition duration-300 ease-in-out
                
                ${
                    isOccupied 
                    // MÀU GHẾ ĐÃ ĐẶT (Màu ĐỎ/XÁM, opacity thấp, không click)
                    ? 'bg-red-500 border-red-500 text-white opacity-50 cursor-not-allowed' 
                    : isSelected 
                    // MÀU GHẾ ĐANG CHỌN 
                    ? 'bg-primary border-primary text-white' 
                    // MÀU GHẾ TRỐNG (Màu mặc định và hover)
                    : 'border-second text-second-dull cursor-pointer hover:bg-primary/20'
                }
            `}
             >
              {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )

  // Tải thông tin phim khi component mount
  useEffect(()=>{
    getShow()
  }, []);

// Bỏ useEffect cũ vì đã tích hợp logic tải ghế vào handleTimeSelect
// và ghế đã đặt chỉ nên được tải khi có selectedTime.

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
          <div onClick={()=> handleTimeSelect(datetime)} key={datetime.time} className={`flex px-3 py-3 border border-second text-second-dull cursor-pointer transition duration-300 ease-in-out rounded-xl justify-center font-semibold ${selectedTime?.time === datetime.time ?'bg-primary text-white':'hover:bg-primary/20'}`}>
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
  <button  disabled={!selectedSeats.length || !selectedTime} onClick={createBooking} className={`flex mt-15 items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-primary cursor-pointer hover:bg-primary-dull transition duration-300 ease-in-out ${!selectedSeats.length || !selectedTime ?'opacity-50' : ''}`}> Process to checkout <ArrowRight/></button>
</div>
</div>
  ):(<Loading/>)
}

export default SeatLayout