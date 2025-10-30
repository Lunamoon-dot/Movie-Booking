import axios from "axios";
import Movie from "../model/Movie.js";
import Show from "../model/Show.js";

//get all now-playing shows from API
export const getNowPlayingMovies = async (req, res) =>{
  try {
    const {data} = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      headers:{ //header co s nha, lam mat 15p fix
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    }) // lấy dữ liệu từ endpoit cx như cấp quyền đc đọc 

    const movies = data.results; //chỉ lấy dữ liệu cần
    res.json({success: true, movies: movies})// trả về fe
  }
  catch(error){
    console.error('Error fetching now playing movies:', error.message);
    res.status(500).json({success: false, message: error.message})
  }
}

// add new show to database
export const addShow = async (req, res)=>{
  try{
    const{movieId, showsInput, showPrice} = req.body; //nhan 3 gia trị đc gửi từ client
    let movie = await Movie.findById(movieId);//tim xem co trong database chx

    //Xu ly du lieu cua Movie
    if(!movie){
      //fetch movie detail
      const[movieDetailsResponse, movieCreditsResponse] = await Promise.all([ //xu ly dong thoi cac promise
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`,{ // lay movie detail
          headers:{ 
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
          }
        }
      ),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`,{ // lay movieCredit
          headers:{ 
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
          }
        })
      ]);
      const movieApiData= movieDetailsResponse.data;
      const movieCreditData = movieCreditsResponse.data;
      //capnhat du lieu
      const moviesDetails = {
        _id:movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path:movieApiData.backdrop_path,
        genres: movieApiData.genres,
        casts: movieCreditData.cast,
        release_date:movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      }
      //Add movie to database
      movie = await Movie.create(moviesDetails);
    }
    //xu ly du lieu cua Show
    const showToCreate =[];
    showsInput.forEach((show)=>{ //showInput co kieu [{date1,time1}, ...]
      const showDate = show.date;
      show.time.forEach((time)=>{
       const dataTimeString = `${showDate}T${time}`//quy uoc thoi gian
       showToCreate.push({
        movie:movieId,
        showDateTime: new Date(dataTimeString),
        showPrice,
        occupiedSeats: {},
       })
      })
    }
  )
  if(showToCreate.length > 0){
    await Show.insertMany(showToCreate);//nhet vo database
  }

  res.json({success: true, message:'Shows add successfully'})
  }
  catch(error){
    console.error(error);
    res.json({success: false,message: error.message})  
  }
}

//get all shows from database and the data are the things come from admin add movie
export const getShows = async (req, res)=>{
  try {
    const shows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie').sort({showDateTime: 1}) // sap sep theo thu tu tang dan

    //filters
    const uniqueShows = new Set(shows.map((show) => show.movie))

    res.json({success: true, shows: Array.from(uniqueShows)})
  }

  catch(error){
    console.log(error);
    res.json({success:false,message: error.message})
  }
}

//get a single show
export const getShow = async (req, res) =>{
  try{
    const {movieId} = req.params;
    const shows = await Show.find({movie: movieId, showDateTime: {$gte: new Date()}})
    const movie = await Movie.findById(movieId)
    const dateTime = {};

    shows.forEach((show)=>{
        const date = show.showDateTime.toISOString().split("T")[0];
        if(!dateTime[date]){ //co the de hieu lam ra mang nhung dateTime la 1 object nó sẽ truy vấn liệu date đã tồn tại trong object chx, nếu chưa thì nó sẽ tạo 1 key là date chứa []
          dateTime[date] = []
        }
        dateTime[date].push({time: show.showDateTime, showId: show._id})//sau đó nó sẽ đẩy object trên vào 
    })
    res.json({success: true, dateTime, movie})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message: error.message})
  }
}