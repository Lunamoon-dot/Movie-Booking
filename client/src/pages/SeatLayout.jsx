import React from 'react'
import { useParams } from 'react-router-dom'

function SeatLayout() {
  const {id, date} = useParams();
  const [selected, setSelected] = useState('');

  return (
    <div>
      
    </div>
  )
}

export default SeatLayout