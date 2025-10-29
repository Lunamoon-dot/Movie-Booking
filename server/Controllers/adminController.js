import Booking from "../model/Booking.js"
import Show from "../model/Show.js"

//API check if user is admin
export const isAdmin = async (req, res)=>{
  res.json({success:true, isAdmin:true})
}

//API to get dashboardata
export const getDashboardData = async (req, res)=>{
  try{
    const bookings = await Booking.find({isPaid: true})
    const activeShows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie');
    const totalUsers = await User.countDocument();
    
    const dashboardData ={
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking)=>acc + booking.amount, 0),
      activeShows,
      totalUsers
    }
    res.json({success:true, dashboardData})
  }
  catch(error){
    console.error(error);
    res.json({success: false, message: error.message})
  }
}

//API to get all shows
export const getAllShows = async (req, res)=>{
  try {
    const shows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie').sort({showDateTime: 1})
    res.json({success: true, shows})
  } catch (error) {
    console.error(error);
    res.json({success: false, message: error.message})
  }
}

//API to get all bookings
export const getAllBookings = async (req, res)=>{
  try {
    const bookings = await Booking.find({}).populate('user').populate({path: "show",
                                                                      populate: {path: "movie"} //lấy tất cả dữ liệu booking bao gồm tất cả dữ liệu trong model user và dữ liệu của bộ phim (ở đây sử dụng phương pháp tham chiếu lồng nên hơi khó hiểu 1 tý nhưng nếu hiểu ref rồi thì dễ thôi)
    }).sort({createAt: -1})//xắp sếp dựa trên thời gian tạo
    res.json({success: true, bookings})
  } catch (error) {
    console.error(error);
    res.json({success: false, message: error.message})
  }
}