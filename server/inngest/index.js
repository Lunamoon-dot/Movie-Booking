import { Inngest } from "inngest";
import User from '../model/User.js'
import Booking from '../model/Booking.js'
import Show from '../model/Show.js'

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

//function luu tru nguoi dung vao database
const syncUserCreation = inngest.createFunction(
  {id: 'sync-user-from-clerk'},
  {event: 'clerk/user.created'},
  async({event})=>{
    const {id,first_name, last_name, email_addresses,image_url} =event.data
    const userData ={
      _id:id,
      email: email_addresses[0].email_address,
      name: last_name + ' ' + first_name,
      image: image_url,

    }
    await User.create(userData)
  }
)

const syncUserDeletion = inngest.createFunction(
  {id: 'delete-user-from-clerk'},
  {event: 'clerk/user.deleted'},
  async({event})=>{
   const {id} = event.data;
   await User.findByIdAndDelete(id);
  }
)
//Deleting seat after a specific of time 
const releaseSeatsAndDeleteBooking = inngest.createFunction(
  {id:'release-seats-expired-booking'},
  {event: "app/checkpayment"},
  async ({event, step}) =>{
    const tenMinuteLater = new Date(Date.now() + 10*60*1000);
    await step.sleepUntil('wait-for-10-minutes', tenMinuteLater);

    await step.run('check-payment-status', async()=>{
      const bookingId = event.data.bookingId;
      const booking = await Booking.findById(bookingId);

      //not pay yet
      if(!booking.isPaid){
        const show = await Show.findById(booking.show)
        booking.bookedSeats.forEach((seat)=> 
          delete show.occupiedSeats[seat]
        );
        show.markModified('occupiedSeats');
        await show.save();
        await Booking.findByIdAndDelete(booking._id)
      }
   })
  }
)

//update userData in database
const syncUserUpdation = inngest.createFunction(
  {id:'update-user-from-clerk'},
  {event: 'clerk/user.updated'},
  async ({event})=>{
    const {id,first_name, last_name, email_addresses,image_url} = event.data;
    const userData ={
      _id:id,
      email: email_addresses[0].email_address,
      name: last_name + ' ' + first_name,
      image: image_url,

    }
    await User.findByIdAndUpdate(id, userData);
  }
)

//Send mail when users books a show
// const sendBookingConfirmationEmail = inngest.createFunction(
//   {id:"send-email-booking-information"},
//   {event:"app/show.booked"},
//   async ({event, step})=>{
//     const {bookingId} = event.data;
//     const booking = await Booking.findById(bookingId).populate(
//       {path:'show',
//          populate:{path:'movie', model:'Movie'}}).populate('user');
//         await sendEmail({
//           to: booking.user.email,
//           subject: `Payment Confirmation: "${booking.show.movie.title}" booked!`,
//           body: `
//                   <div style="font-family: Arial, sans-serif; line-height: 1.5;">
//                     <h2>Hi ${booking.user.name},</h2>
//                     <p>Your booking for <strong style="color: #F84565;">"${booking.show.movie.title}"</strong> is confirmed.</p>
//                     <p>
//                       <strong>Date:</strong> ${new Date(booking.show.showDateTime).toLocaleDateString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}<br/>
//                       <strong>Time:</strong> ${new Date(booking.show.showDateTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}
//                     </p>
//                     <p>Enjoy the show! 🍿</p>
//                     <p>Thanks for booking with us!<br/>—  OwlCinema</p>
//                   </div>
//                 `

//         })
//   }
// )

export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdation,releaseSeatsAndDeleteBooking];