import Stripe from 'stripe';
import Booking from '../model/Booking.js';

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

const markBookingAsPaid = async (bookingId) => {
  if (!bookingId) {
    console.warn('Missing bookingId in Stripe event metadata.');
    return;
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    console.warn(`Booking ${bookingId} not found when processing Stripe webhook.`);
    return;
  }

  if (booking.isPaid) {
    console.log(`Booking ${bookingId} already paid. Ignoring event.`);
    return;
  }

  await Booking.findByIdAndUpdate(bookingId, {
    isPaid: true,
    paymentLink: "",
  });

  console.log(`Booking ${bookingId} updated to Paid via Stripe webhook.`);
};

export const stripeWebhooks = async (request, response)=>{
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers["stripe-signature"];
    let event;
    
    try {
      // 1. XÁC THỰC CHỮ KÝ (Không thay đổi)
      event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
      // TRẢ VỀ LỖI 400 NGAY LẬP TỨC
      return response.status(400).send(`Webhook Error: ${error.message}`)
    }

    try {
      // CHUYỂN SANG LẮNG NGHE checkout.session.completed
      switch(event.type){
        case "checkout.session.completed":
        case "checkout.session.async_payment_succeeded": {
          const session = event.data.object;
          
          // Kiểm tra xem PaymentIntent có thành công không (đặc biệt cần cho thanh toán không đồng bộ)
          if(session.payment_status === 'paid'){ 
            
            // 2. TRUY XUẤT bookingId THẲNG TỪ SESSION (nhanh hơn)
            const {bookingId} = session.metadata; 
            
            // 3. THÊM LOGIC IDEMPOTENCY:
            const booking = await Booking.findById(bookingId);
            
            // Chỉ cập nhật nếu bản ghi tồn tại và CHƯA được thanh toán
            if (booking && !booking.isPaid) {
                 await Booking.findByIdAndUpdate(bookingId, {
                    isPaid: true,
                    paymentLink: "" // Xóa payment link sau khi đã thanh toán
                 });
                 console.log(`Booking ${bookingId} updated to Paid.`);
            } else if (booking && booking.isPaid) {
                 // Nếu đã trả tiền (do Stripe gửi lại), chỉ cần log và bỏ qua.
                 console.log(`Booking ${bookingId} already paid. Ignoring event.`);
            }
          }
          break;
        }
        
        case "payment_intent.succeeded": {
            // Nên xử lý logic tương tự như trên (tìm session, kiểm tra idempotency)
            console.log('Payment Intent Succeeded event received. Using checkout.session.completed is recommended.');
            break;
        }

        default:
          console.log('Unhandled event type', event.type)
      }
      
      // 4. LUÔN TRẢ VỀ 200 OK (ĐỂ TRÁNH STRIPE THỬ LẠI)
      response.json({received: true});
    } catch (err) {
      // Nếu logic database bị lỗi, trả về 500 để Stripe thử lại
      console.error("Webhook error during processing:", err);
      response.status(500).send("Internal Server Error");
    }
}