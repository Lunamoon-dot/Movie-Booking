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

const getAuthData = (req) => {
  if (!req) return {};
  if (typeof req.auth === "function") {
    return req.auth() || {};
  }
  return req.auth || {};
};

export const creatingBooking = async(req, res)=>{
  try{
    const { userId } = getAuthData(req);
    const{showId, selectedSeats, isPaid = false} = req.body;
    const {origin} = req.headers;
    //xem seat co con khong
    const isAvailable = await checkSeatAvailability(showId, selectedSeats);
    if(!isAvailable){
      return res.json({success:false, message: "Selected seat is not available"})
    }
    const showData = await Show.findById(showId).populate('movie');

    //create new booking
    const booking = await Booking.create({ //luu du lieu vo booking
      user:userId,
      show:showId,
      amount:showData.showPrice*selectedSeats.length,
      bookedSeats: selectedSeats,
      isPaid,
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
    const showData = await Show.findById(showId)
    const occupiedSeats = Object.keys(showData.occupiedSeats)
    res.json({success: true, occupiedSeats})
  }
  catch(error){
    console.log(error.message);
    res.json({success:false,message: error.message})
  }
}