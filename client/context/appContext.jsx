import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL= import.meta.env.VITE_BASE_URL;
const img_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export const AppContext = createContext();
 export const AppProvider = ({children})=>{
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const {user} = useUser()
  const {getToken} = useAuth()
  const location = useLocation()

  const fetchIsAdmin = async ()=>{ // cần nghiên cứu
    try {
      const token = await getToken();
      const {data}= await axios.get('/api/admin/is-admin', {headers:
        {Authorization:`Bearer ${token}`}
      })
      
      if(data.success){
        setIsAdmin(data.isAdmin)
      }
      
      if(!data.isAdmin && location.pathname.startsWith('/admin')){
        navigate('/');
        toast.error('You are not authorized')
      }
    } catch (error) {
      console.error("Error in fetchIsAdmin:", error);
    }
  }

  const fetchShows =async()=>{
    try {
      const {data} = await axios.get('/api/show/all') //data của res. Có thể viết res = axios.get('/api/show/all')  và lấy data bằng res.data nhưng khá rối
      if(data.success){
        setShows(data.shows)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchFavorites = async () => {
    try {
      const token = await getToken();
      console.log("fetchFavorites - token:", token ? "exists" : "missing");
      console.log("fetchFavorites - baseURL:", axios.defaults.baseURL);
      const {data} = await axios.get('/api/user/favorites',  {headers:
        {Authorization:`Bearer ${token}`}
      })
      console.log("fetchFavorites - response:", data);
      if(data.success){
        setFavorites(data.movies)
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error("fetchFavorites - error:", error);
      console.error("fetchFavorites - error response:", error.response?.data);
    }
  }

  const toggleFavorite = async (movieId, movieObject = null) => {
    // Optimistic update - cập nhật UI ngay lập tức
    const isCurrentlyFavorite = favorites.some(movie => movie._id === movieId);
    const previousFavorites = [...favorites]; // Backup để revert nếu cần
    
    if (isCurrentlyFavorite) {
      // Xóa khỏi favorites ngay lập tức
      setFavorites(favorites.filter(movie => movie._id !== movieId));
    } else {
      // Thêm vào favorites ngay lập tức
      const movieToAdd = movieObject || shows.find(show => show._id === movieId);
      if (movieToAdd) {
        setFavorites([...favorites, movieToAdd]);
      }
    }

    try {
      const token = await getToken();
      console.log("toggleFavorite - token:", token ? "exists" : "missing");
      console.log("toggleFavorite - baseURL:", axios.defaults.baseURL);
      const {data} = await axios.post('/api/user/update-favorite', 
        {movieId},
        {headers: {Authorization:`Bearer ${token}`}}
      )
      console.log("toggleFavorite - response:", data);
      
      if(!data.success){
        // Nếu API fail, revert lại state cũ
        setFavorites(previousFavorites);
        toast.error(data.message);
      }
    } catch (error) {
      // Nếu có lỗi, revert lại state cũ
      setFavorites(previousFavorites);
      console.error("toggleFavorite - error:", error);
      console.error("toggleFavorite - error response:", error.response?.data);
      toast.error('Failed to update favorites');
    }
  }

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie._id === movieId);
  }



  useEffect(()=>{
    if(user){
      fetchIsAdmin();
      fetchFavorites();
    }
  },[user])

  useEffect(()=>{
    fetchShows();
  }, [])

  const value ={axios,
                fetchFavorites,favorites,toggleFavorite,isFavorite,
                fetchIsAdmin,isAdmin,
                user, getToken, navigate,
                shows, img_base_url,

  }
  return(
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
 }

export const useAppContext = ()=> useContext(AppContext);//tóm gọn khi gọi