import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Loading() {

  const {nextUrl} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    if(nextUrl){
      setTimeout(()=>{navigate('/' + nextUrl)}, 8000)
    }
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
