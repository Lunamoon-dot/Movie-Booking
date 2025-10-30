import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'

export default function Loading() {

  const {nextUrl} = useParams();
  const navigate = useNavigate();
  const { axios, getToken } = useAppContext();

  useEffect(()=>{
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');
        if (sessionId) {
          const token = await getToken();
          await axios.post('/api/booking/confirm', { sessionId }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      } catch (err) {
        // No-op: even if confirm fails, continue navigation
      } finally {
        if(nextUrl){
          setTimeout(()=>{navigate('/' + nextUrl)}, 1500)
        }
      }
    })();
  },[])
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  )
}
