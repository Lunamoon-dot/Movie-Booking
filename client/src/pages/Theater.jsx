import React from 'react'
import { MapPin, Clock, Phone, Navigation } from 'lucide-react'

function Theater() {
  // Dữ liệu mẫu cho các rạp chiếu phim
  const theaters = [
    {
      id: 1,
      name: 'CGV Vincom Center',
      address: '72 Lê Thánh Tôn, Quận 1, TP.HCM',
      phone: '1900 6017',
      distance: '2.5 km',
      screens: 8,
      facilities: ['3D', 'IMAX', '4DX', 'VIP'],
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Galaxy Cinema Nguyễn Du',
      address: '116 Nguyễn Du, Quận 1, TP.HCM',
      phone: '1900 2224',
      distance: '3.1 km',
      screens: 6,
      facilities: ['3D', 'Gold Class', 'Dolby Atmos'],
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Lotte Cinema Diamond',
      address: '34 Lê Duẩn, Quận 1, TP.HCM',
      phone: '1900 5454',
      distance: '4.2 km',
      screens: 10,
      facilities: ['3D', 'IMAX', 'Premium'],
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'BHD Star Cineplex',
      address: '3/2 Trần Cao Vân, Quận 1, TP.HCM',
      phone: '1900 2099',
      distance: '3.8 km',
      screens: 7,
      facilities: ['3D', 'Blue Ribbon', 'IMAX'],
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'Mega GS Cinemas',
      address: '159 Hai Bà Trưng, Quận 3, TP.HCM',
      phone: '1900 6000',
      distance: '5.0 km',
      screens: 5,
      facilities: ['3D', 'Luxury'],
      image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      name: 'CineStar Hai Bà Trưng',
      address: '135 Hai Bà Trưng, Quận 3, TP.HCM',
      phone: '1900 6299',
      distance: '4.5 km',
      screens: 6,
      facilities: ['3D', 'Digital'],
      image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop'
    }
  ]

  return (
    <div className='min-h-screen bg-bg-main bg-linear-to-br from-bg-gradient-from via-bg-gradient-via to-bg-gradient-to pt-30 pb-20 px-6 md:px-16 lg:px-25'>
      {/* Header */}
      <div className='flex flex-col items-center mb-15'>
        <h1 className='text-5xl font-bold text-white mb-4'>
          <span className='text-primary'>Cinema</span> Theaters 
        </h1>
        <p className='text-gray-400 text-lg text-center max-w-2xl'>
          Discover the best movie theaters near you with state-of-the-art facilities ...này là AI code nhà ae :Đ
        </p>
      </div>

      {/* Filter Options */}
      <div className='flex flex-wrap gap-3 justify-center mb-12'>
        <button className='px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary-dull transition'>
          All Theaters
        </button>
        <button className='px-6 py-2.5 rounded-full bg-bg-card text-white font-medium hover:bg-bg-card-hover transition'>
          IMAX
        </button>
        <button className='px-6 py-2.5 rounded-full bg-bg-card text-white font-medium hover:bg-bg-card-hover transition'>
          4DX
        </button>
        <button className='px-6 py-2.5 rounded-full bg-bg-card text-white font-medium hover:bg-bg-card-hover transition'>
          VIP
        </button>
        <button className='px-6 py-2.5 rounded-full bg-bg-card text-white font-medium hover:bg-bg-card-hover transition'>
          Near Me
        </button>
      </div>

      {/* Theater List */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
        {theaters.map((theater) => (
          <div 
            key={theater.id}
            className='bg-bg-card rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 hover:bg-bg-card-hover transition-all duration-300 cursor-pointer'
          >
            {/* Theater Image */}
            <div className='relative h-48 overflow-hidden'>
              <img 
                src={theater.image} 
                alt={theater.name}
                className='w-full h-full object-cover'
              />
              <div className='absolute top-3 right-3 bg-primary px-3 py-1.5 rounded-full text-sm font-medium'>
                {theater.screens} Screens
              </div>
            </div>

            {/* Theater Info */}
            <div className='p-5'>
              <h3 className='text-2xl font-bold text-white mb-3'>{theater.name}</h3>
              
              {/* Address */}
              <div className='flex items-start gap-2 text-gray-300 mb-2'>
                <MapPin className='w-5 h-5 text-primary mt-0.5 shrink-0' />
                <p className='text-sm'>{theater.address}</p>
              </div>

              {/* Distance */}
              <div className='flex items-center gap-2 text-gray-300 mb-2'>
                <Navigation className='w-5 h-5 text-primary' />
                <p className='text-sm'>{theater.distance} from you</p>
              </div>

              {/* Phone */}
              <div className='flex items-center gap-2 text-gray-300 mb-4'>
                <Phone className='w-5 h-5 text-primary' />
                <p className='text-sm'>{theater.phone}</p>
              </div>

              {/* Facilities */}
              <div className='flex flex-wrap gap-2 mb-4'>
                {theater.facilities.map((facility, index) => (
                  <span 
                    key={index}
                    className='px-3 py-1 bg-bg-section text-white text-xs rounded-full'
                  >
                    {facility}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className='flex gap-3'>
                <button className='flex-1 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary-dull transition'>
                  View Showtimes
                </button>
                <button className='px-4 py-2.5 rounded-full bg-bg-section text-white hover:bg-bg-card-hover transition'>
                  <MapPin className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Theater

