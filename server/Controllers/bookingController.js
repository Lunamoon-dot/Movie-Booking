import Booking from "../model/Booking.js";
import Show from "../model/Show.js"


const checkSeatAvailability =async (showId, selectedSeats) =>{
  try{
    const showData = await Show.findById(showId);
    if(!showData) return false;
    const occupiedSeats = showData.occupiedSeats;

    const IsSeatsTaken =selectedSeats.some(seat => occupiedSeats[seat]);
    return !IsSeatsTaken;
  }
  catch(error){
    console.log(error.message);
    return false;
  }
}

export const creatingBooking = async(req, res)=>{
  try{
    const {userId} = req.auth();
    const{showId, selectedSeats} = req.body;
    const {origin} = req.headers;
    //xem seat co con khong
    const isAvailable = await checkSeatAvailability(showId, selectedSeats);
    if(!isAvailable){
      return res.json({success:false, message: "Selected seat is not available"})
    }
    const showData = await Show.findbyId(showId).populate('movie');

    //create new booking
    const booking = await Booking.create({ //luu du lieu vo booking
      user:userId,
      show:showId,
      amount:showData.showPrice*selectedSeats.length,
      bookedSeats: selectedSeats,
    }) 

    selectedSeats.map((seat)=>{
      showData.occupiedSeats[seat] =userId;
    })
    showData.markModified('occupiedSeats');//dam bao database luu du lieu nay khi save
    await showData.save();

    res.json({success:true, message: 'Booked successfully'})
  }
  catch(error){
    console.log(error.message);
    res.json({success:false,message: error.message})
  }
}

export const getOccupiedSeats = async (req, res)=>{
  try{
    const {showId} = req.params;
    const showData = await Show.findbyId(showId)
    const occupiedSeats = Object.keys(showData.occupiedSeats)
    res.json({success: true, occupiedSeats})
  }
  catch(error){
    console.log(error.message);
    res.json({success:false,message: error.message})
  }
}