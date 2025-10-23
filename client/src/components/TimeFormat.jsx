import React from 'react'

function TimeFormat({movie}) {
let hour = null;
let minute = null;

  if(movie.runtime > 60){
    hour = Math.floor(movie.runtime / 60);
    minute = movie.runtime%60;
  }
  else if(movie.runtime < 60){
    minute = movie.runtime%60;
  }
  else{
    hour = Math.floor(movie.runtime / 60);
  }
  
  return (
    <div>
      {hour !== null && `${hour}h`} {' '}{minute !== null && `${minute}m`}
    </div>
  )
}

export default TimeFormat