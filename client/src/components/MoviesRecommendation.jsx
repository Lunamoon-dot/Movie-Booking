import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';

function MoviesRecommendation({ movies, id }) {
  const navigate = useNavigate();
  const {img_base_url} = useAppContext();
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    // Đảm bảo scrollRef.current tồn tại trước khi gọi scrollBy
    if (scrollRef.current) { 
        scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mt-6">
      <p className="text-2xl font-semibold mb-3">Recommend Movies</p>

      {/* Nút trái - CHỈ giữ onClick trên div bao ngoài */}
      <div 
        onClick={scrollLeft} 
        className="absolute px-2 py-2 left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary-dull/20 transition text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" // Thêm cursor-pointer cho dễ nhận biết
      >
        <ArrowLeft />
      </div>

      {/* Dãy phim */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide p-2"
      >
        {movies.map((movie, index) => (
          movie._id !== id && (
            <div onClick={()=>{navigate(`/movie-detail/${movie._id}/1`); scrollTo(0, 0)}} key={index} className="shrink-0 flex flex-col gap-2 w-48 cursor-pointer hover:scale-105 transition ease-in-out">
              <img
                src={img_base_url + movie.poster_path}
                alt={movie.title}
                className="rounded-xl object-cover w-full h-72"
              />
              <p className="text-center text-sm">{movie.title}</p>
            </div>
          )
        ))}
      </div>

      {/* Nút phải - CHỈ giữ onClick trên div bao ngoài */}
      <div 
        onClick={scrollRight} 
        className="absolute px-2 py-2 right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary-dull/20 transition text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" // Thêm cursor-pointer
      >
        <ArrowRight />
      </div>
      
    </div>
  );
}

export default MoviesRecommendation;