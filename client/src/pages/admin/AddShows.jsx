import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { Star,Check, DeleteIcon } from 'lucide-react';
import { KConverter } from '../../lib/ConverterK';
import toast from 'react-hot-toast'; // Đảm bảo bạn đã cài đặt và cấu hình react-hot-toast
import {useAppContext} from '../../../context/appContext'

function AddShows() {

  const {axios, getToken, user,img_base_url} = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const [addingShow, setAddingShow] = useState(false);

  const handleSubmit = async ()=>{
    try {
      if(!selectedMovie || !showPrice || Object.keys(dateTimeSelection).length === 0){
        return toast.error('Missing required fields')
      }
      setAddingShow(true)
      const showsInput = Object.entries(dateTimeSelection).map(([date, times])=>(
        {date, time: times}
      ));
      const payload = {
          movieId: selectedMovie,
          showsInput,
          showPrice: Number(showPrice)
      }
      // TODO: Add API call here
      const token = await getToken();
      const {data} = await axios.post('/api/show/add', payload, {headers:{
        Authorization: `Bearer ${token}`
      }})
      if(data.success){
        toast.success('Movie added successfully')
        setSelectedMovie(null);
        setShowPrice('');
        setDateTimeSelection({});
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.')
    } finally {
      setAddingShow(false);
    }
  }

  const fetchData = async()=>{
    // Giả sử dummyShowsData chứa dữ liệu phim
    try {
      const token = await getToken();
      const {data} = await axios.get('/api/show/now-playing', {headers:{
        Authorization: `Bearer ${token}`
      }})
      if(data.success){
        setNowPlayingMovies(data.movies);
      }
    } catch (error) {
      console.error('Movies fetching failed', error)
    }
  }

  // CẬP NHẬT: Tách logic kiểm tra trùng lặp  và thông báo lỗi ra khỏi setDateTimeSelection
  const handleDateTimeAdd = ()=>{
    if(!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if(!date || !time) return;
    setDateTimeInput('');
    // 1. Kiểm tra trùng lặp trước khi gọi setDateTimeSelection
    const times = dateTimeSelection[date] || [];

    if(times.includes(time)){
      // Nếu trùng, thông báo lỗi và dừng hàm
      toast.error('Ngày và giờ này đã được thêm.');
      return; 
    }

    setDateTimeSelection((prev) => {
      const timesArray = prev[date] || [];
      return {
        ...prev, 
        [date]: [...timesArray, time].sort() // Thêm giờ chiếu mới và sắp xếp
      };
    });

    toast.success('Đã thêm giờ chiếu mới.');
  }

  const handleRemoveTime = (date, time)=> {
    setDateTimeSelection ((prev) =>{
      const filteredTimes = prev[date].filter((t) => t !==time);
      if(filteredTimes.length === 0){
        const {[date]: _, ...rest} =prev;
        return rest;
      }
      return{
        ...prev,
        [date]:filteredTimes,
      }
    })
    toast.success(`Đã xóa giờ chiếu ${time} của ngày ${date}.`);
  }

  useEffect(()=>{
    if(user){
      fetchData(); //đề phòng việc bị gọi api liên tục bởi attacker, thật ra user vẫn gửi đc nhưng sẽ bị chặn ở BE và có thể truy vết ai gửi
    }
    
  },[user])

  return nowPlayingMovies.length > 0 ?(
    <div className='flex flex-col mt-10 mb-20 p-4 max-w-7xl mx-auto w-full'>
      <p className='font-semibold text-2xl mb-8'>Add Shows</p>
      <p className=' font-medium mb-8'>Now Playing Movies</p>

      {/* Danh sách phim */}
      <div className='movie-list-container movie-list-container::-webkit-scrollbar pb-4 py-2'>
        <div className='group flex gap-4 w-max py-2'>
        {nowPlayingMovies.map((item) =>(
          <div 
            key={item.id} 
            className={`relative w-[180px] flex-shrink-0 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition rounded-lg duration-300 overflow-hidden ${selectedMovie === item.id ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''}`}
            onClick={(()=> setSelectedMovie(item.id))}
          >
            <div className='relative overflow-hidden rounded-lg'>
             <img src={img_base_url + item.poster_path} alt={item.title}  className='object-cover w-full h-full brightness-90'/>
             {/* Div overlay */}
             <div className='flex absolute bottom-0 left-0 w-full bg-black/70 item-center justify-between mt-2 px-2 py-3'>
              <div className='flex items-center gap-1 text-white'>
                <Star className='fill-primary text-primary w-5'/>
                <p className='text-sm'> {`${Math.floor((item.vote_average/2)*10)/10}/5`} {''}
              </p>
              </div>
              <p className='text-sm text-white'>{KConverter(item.vote_count)} Votes</p>
             </div>
            {/* Checkbox */}
            <div className={`aspect-square w-5 h-5 border-primary flex justify-center items-center border-2 absolute top-3 right-3 z-50 rounded-full ${selectedMovie === item.id && 'bg-primary'}`}>
                {selectedMovie === item.id && <Check strokeWidth={3} className='w-4 h-4 text-white'/>}
            </div>
          </div>
            <p className='font-medium truncate mt-2'>{item.title}</p>
            <p className='text-gray-400 text-sm'>{item.release_date}</p>
          </div>
        ))} 
        </div> 		
      </div>
    
    {/* Creating Price Input Form */}
    <div className="mt-8">
      <label htmlFor="price-input" className="block text-sm font-medium mb-2">Choose Price</label>
      <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md bg-gray-800">
        <p className="text-gray-400 text-sm">{currency}</p>
        <input
          id="price-input"
          min={0}
          type="number"
          value={showPrice}
          onChange={(e) => setShowPrice(e.target.value)}
          placeholder="Enter show price"
          className="outline-none bg-transparent appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
        />
      </div>
    </div>

    {/* Creating Date and Time Selection */}
    <div className='mt-6'>
      <label htmlFor="datetime-input" className="block text-sm font-medium mb-2">Select Date and Time</label>
      <div className='flex items-center gap-4'>
        <input 
          id="datetime-input"
          type="datetime-local" 
          onChange={(e)=> setDateTimeInput(e.target.value)}
          value={dateTimeInput}
          className='border border-gray-600 px-3 py-2 rounded-md bg-gray-800 text-white'
        />
        <button 
          onClick={handleDateTimeAdd} 
          className='bg-primary/80 text-white px-4 py-2 text-sm rounded-lg hover:bg-primary transition cursor-pointer'
        >
          Add Time
        </button>
      </div>
    </div>
    
    {/* Display Selected Time  */}
    {Object.keys(dateTimeSelection).length > 0 &&
    <div className='mt-6'>
      <h2 className='mb-4 text-xl font-semibold'>Selected Showtimes</h2>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'> 
        {Object.entries(dateTimeSelection).map(([date, times])=>
        (
          <li key={date} className='p-4 border border-gray-700 rounded-lg bg-gray-800/50 shadow-lg'>
            <div className='font-bold text-lg mb-2 text-primary'>{date}</div>
            <div className='flex flex-wrap gap-2 text-sm'>
              {times.sort().map((time)=>(
                  <div 
                    key={time} 
                    className='bg-gray-700 text-white px-3 py-1 flex items-center rounded-full transition hover:bg-red-900'
                  >
                    <span>{time}</span>
                    <DeleteIcon 
                      onClick={()=> handleRemoveTime(date, time)} 
                      className='ml-2 w-4 h-4 text-red-400 cursor-pointer hover:text-red-300'
                    />
                  </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
    }

    {/* Nút cuối cùng */}
    <button 
      disabled={addingShow || !selectedMovie || !showPrice || Object.keys(dateTimeSelection).length === 0} 
      onClick={handleSubmit} 
      className={`w-full max-w-sm px-4 py-3 bg-primary text-white font-semibold rounded-md mt-10 transition duration-300 ease-in hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary`}
    >
      {addingShow ? 'Adding...' : 'Add Show'}
    </button>
   </div>
  ):(<Loading/>)
}

export default AddShows;
