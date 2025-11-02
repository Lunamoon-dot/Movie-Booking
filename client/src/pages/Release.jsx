import React, { useState } from 'react'
import { Calendar, Clock, Star, Play } from 'lucide-react'

function Release() {
  const [activeTab, setActiveTab] = useState('upcoming')

  // Dữ liệu mẫu cho phim sắp ra mắt
  const upcomingMovies = [
    {
      id: 1,
      title: 'Dune: Part Three',
      releaseDate: '2025-12-18',
      genre: ['Sci-Fi', 'Adventure'],
      rating: 4.8,
      duration: '165 min',
      poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&auto=format&fit=crop',
      description: 'The epic conclusion to the Dune trilogy continues the journey of Paul Atreides.',
      trailer: true
    },
    {
      id: 2,
      title: 'Avatar: The Seed Bearer',
      releaseDate: '2025-12-22',
      genre: ['Sci-Fi', 'Action'],
      rating: 4.9,
      duration: '192 min',
      poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&auto=format&fit=crop',
      description: 'Jake Sully and Neytiri face new challenges in the world of Pandora.',
      trailer: true
    },
    {
      id: 3,
      title: 'The Batman Returns',
      releaseDate: '2026-01-15',
      genre: ['Action', 'Crime'],
      rating: 4.7,
      duration: '170 min',
      poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&auto=format&fit=crop',
      description: 'The Dark Knight returns to face his greatest threat yet.',
      trailer: true
    },
    {
      id: 4,
      title: 'Inception: Dreams Within',
      releaseDate: '2026-02-20',
      genre: ['Sci-Fi', 'Thriller'],
      rating: 4.6,
      duration: '158 min',
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&auto=format&fit=crop',
      description: 'A new team of extractors explores deeper levels of the dreamscape.',
      trailer: false
    },
    {
      id: 5,
      title: 'Interstellar: Beyond',
      releaseDate: '2026-03-10',
      genre: ['Sci-Fi', 'Drama'],
      rating: 4.8,
      duration: '180 min',
      poster: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&auto=format&fit=crop',
      description: 'A new mission takes humanity further into the cosmos.',
      trailer: false
    },
    {
      id: 6,
      title: 'The Matrix: Resurrection',
      releaseDate: '2026-04-05',
      genre: ['Sci-Fi', 'Action'],
      rating: 4.5,
      duration: '148 min',
      poster: 'https://images.unsplash.com/photo-1574267432644-f71146c8085e?w=400&auto=format&fit=crop',
      description: 'Neo returns to the Matrix for one final battle.',
      trailer: true
    }
  ]

  const comingSoonMovies = [
    {
      id: 7,
      title: 'Blade Runner 2099',
      releaseDate: '2026-06-15',
      genre: ['Sci-Fi', 'Noir'],
      rating: null,
      duration: 'TBA',
      poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&auto=format&fit=crop',
      description: 'The future of humanity hangs in the balance in this cyberpunk thriller.',
      trailer: false
    },
    {
      id: 8,
      title: 'Jurassic Universe',
      releaseDate: '2026-07-22',
      genre: ['Action', 'Adventure'],
      rating: null,
      duration: 'TBA',
      poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&auto=format&fit=crop',
      description: 'Dinosaurs and humans must coexist in a changing world.',
      trailer: false
    }
  ]

  const displayMovies = activeTab === 'upcoming' ? upcomingMovies : comingSoonMovies

  const getMonthName = (dateStr) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date(dateStr)
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const getDaysUntilRelease = (dateStr) => {
    const releaseDate = new Date(dateStr)
    const today = new Date()
    const diffTime = releaseDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? `${diffDays} days to go` : 'Released'
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-bg-gradient-from via-bg-gradient-via to-bg-gradient-to pt-30 pb-20 px-6 md:px-16 lg:px-25'>
      {/* Header */}
      <div className='flex flex-col items-center mb-15'>
        <h1 className='text-5xl font-bold text-white mb-4'>
          <span className='text-primary'>New</span> Releases
        </h1>
        <p className='text-gray-400 text-lg text-center max-w-2xl'>
          Stay ahead with upcoming blockbusters and highly anticipated films ..Cho AI code linh tinh=Đ
        </p>
      </div>

      {/* Tabs */}
      <div className='flex justify-center gap-4 mb-12'>
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`px-8 py-3 rounded-full font-medium transition ${
            activeTab === 'upcoming' 
              ? 'bg-primary text-white' 
              : 'bg-bg-card text-gray-400 hover:bg-bg-card-hover'
          }`}
        >
          Upcoming Releases
        </button>
        <button 
          onClick={() => setActiveTab('comingsoon')}
          className={`px-8 py-3 rounded-full font-medium transition ${
            activeTab === 'comingsoon' 
              ? 'bg-primary text-white' 
              : 'bg-bg-card text-gray-400 hover:bg-bg-card-hover'
          }`}
        >
          Coming Soon
        </button>
      </div>

      {/* Movies Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
        {displayMovies.map((movie) => (
          <div 
            key={movie.id}
            className='bg-bg-card rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 hover:bg-bg-card-hover transition-all duration-300 cursor-pointer'
          >
            {/* Movie Poster */}
            <div className='relative h-96 overflow-hidden group'>
              <img 
                src={movie.poster} 
                alt={movie.title}
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
              />
              
              {/* Overlay */}
              <div className='absolute inset-0 bg-linear-to-t from-bg-main via-transparent to-transparent' />
              
              {/* Trailer Badge */}
              {movie.trailer && (
                <div className='absolute top-4 right-4 bg-primary px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1'>
                  <Play className='w-4 h-4' />
                  Trailer
                </div>
              )}

              {/* Release Date Badge */}
              <div className='absolute top-4 left-4 bg-black/70 backdrop-blur px-3 py-2 rounded-lg'>
                <p className='text-primary font-bold text-sm'>{getMonthName(movie.releaseDate)}</p>
                <p className='text-white text-xs mt-0.5'>{getDaysUntilRelease(movie.releaseDate)}</p>
              </div>
            </div>

            {/* Movie Info */}
            <div className='p-5'>
              <h3 className='text-2xl font-bold text-white mb-2'>{movie.title}</h3>
              
              {/* Genres */}
              <div className='flex flex-wrap gap-2 mb-3'>
                {movie.genre.map((g, index) => (
                  <span 
                    key={index}
                    className='px-3 py-1 bg-bg-section text-white text-xs rounded-full'
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className='text-gray-400 text-sm mb-4 line-clamp-2'>
                {movie.description}
              </p>

              {/* Meta Info */}
              <div className='flex items-center justify-between text-sm text-gray-300 mb-4'>
                <div className='flex items-center gap-1'>
                  <Clock className='w-4 h-4 text-primary' />
                  <span>{movie.duration}</span>
                </div>
                
                {movie.rating && (
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 text-primary fill-primary' />
                    <span>{movie.rating}/5</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className='flex gap-3'>
                <button className='flex-1 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary-dull transition'>
                  Get Notified
                </button>
                {movie.trailer && (
                  <button className='px-4 py-2.5 rounded-full bg-bg-section text-white hover:bg-bg-card-hover transition'>
                    <Play className='w-5 h-5' />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Release

