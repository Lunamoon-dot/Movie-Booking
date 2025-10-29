import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL= import.meta.env.VITE_BASE_URL;

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
        navigate('/')
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
      const {data} = await axios.get('/api/user/favorites',  {headers:
        {Authorization:`Bearer ${token}`}
      })
      if(data.success){
        setFavorites(data.movies)
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(()=>{
    if(user){
      fetchIsAdmin();
      fetchFavorites();
    }
  },[user, getToken, location, navigate])

  useEffect(()=>{
    fetchShows();
  }, [])

  const value ={axios,
                fetchFavorites,favorites,
                fetchIsAdmin,isAdmin,
                user, getToken, navigate,
                shows, 

  }
  return(
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
 }

 export const useAppContext = ()=> useContext(AppContext);