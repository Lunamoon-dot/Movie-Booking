import React from 'react'
import background from '../assets/background.jpg'
import ghiblilogo from '../assets/ghiblilogo.png'
import title from '../assets/title.png'
import {ArrowRight, CalendarFold, Clock} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

function HeroSession() {
  const navigate = useNavigate();
  return (
  //  not responsive yet 
    <div className='flex flex-col opacity-75 gap-2 items-start justify-center px-20 bg-cover bg-center w-full h-screen' style={{  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 50%),
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${background})` }}>
      {/* logo */}
      <img src={ghiblilogo} alt=""  className='w-80'/>
      {/* title */}
      <img src={title} alt="" className='w-100'/>
      {/* type */}
      <div className='flex gap-5'>
        <p >Animation | Aventure | Fantasy | Family |Drama </p>
        <div className='flex gap-1 mb-5'>
          <CalendarFold width={18}/>
          <p>2023</p>
        </div>
        <div className='flex'>
          <Clock width={18}/>
          <p>2h 4m</p>
        </div>
      </div>
      <div className='max-w-180 mb-5'>
      While the Second World War rages, the teenage Mahito, haunted by his mother's tragic death, is relocated from Tokyo to the serene rural home of his new stepmother Natsuko, a woman who bears a striking resemblance to the boy's mother. As he tries to adjust, this strange new world grows even stranger following the appearance of a persistent gray heron, who perplexes and bedevils Mahito, dubbing him the "long-awaited one."
      </div>
       {/* visit movies button */}
        <button  className='text-center flex px-4 py-3 gap-1 hover:bg-primary-dull cursor-pointer transition ease-in-out duration-300 hover:text-gray-400  bg-primary rounded-3xl font-semibold'
        onClick={()=> navigate('/movies')}
        >
          Explore Movies <ArrowRight strokeWidth={3} width={18}/>
        </button>
    </div>
  )
}

export default HeroSession