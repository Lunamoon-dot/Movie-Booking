import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import connectDB from './config/db.js'; 
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

// Import Routes
import showRouter from './Routes/showRoutes.js';
import bookingRouter from './Routes/bookingRoutes.js';
import adminRouter from './Routes/adminRoutes.js';
import userRouter from './Routes/userRoutes.js';

// --- PHẦN KHỞI TẠO CHẠY 1 LẦN (Initialization) ---
// Định nghĩa ứng dụng Express
const app = express();

// Kiểm tra Biến Môi trường và Kết nối DB
// Đặt biến cờ để đảm bảo chỉ kết nối DB một lần
let isDbConnected = false; 

/**
 * Hàm khởi tạo bất đồng bộ để thiết lập DB và kiểm tra biến môi trường.
 * Hàm này sẽ chạy khi module được import lần đầu (Vercel Cold Start).
 */
async function initializeApp() {
    // 1. Kiểm tra Biến Môi trường
    if (!process.env.TMDB_API_KEY || !process.env.MONGODB_URI || !process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
        console.error('❌ Lỗi: Thiếu các biến môi trường cần thiết! Hãy kiểm tra Vercel Environment Variables.');
        // Trong môi trường serverless, không dùng process.exit(1),
        // thay vào đó, để hàm tiếp tục, nếu connectDB thất bại nó sẽ tự trả về lỗi.
        // Bạn cần đảm bảo hàm connectDB tự xử lý và ném lỗi nếu thất bại.
    }

    // 2. Kết nối Database (Chỉ kết nối nếu chưa kết nối)
    if (!isDbConnected) {
        try {
            console.log('🔗 Đang kết nối đến cơ sở dữ liệu...');
            await connectDB();
            isDbConnected = true;
            console.log('✅ Kết nối DB thành công.');
        } catch (error) {
            console.error('Lỗi kết nối CSDL:', error.message);
            // Ném lỗi để Serverless Function thất bại nếu DB là bắt buộc
            throw new Error('Database connection failed to initialize.');
        }
    }
}


// --- MIDDLEWARE VÀ ROUTES (Phần định nghĩa ứng dụng) ---

// Gọi hàm khởi tạo ngay
initializeApp();


// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// API Routes
app.get('/', (req, res)=> res.send('Serverless Function is live!'));

// Inngest Route
app.use('/api/inngest', serve({ client: inngest, functions }));

// Custom Routes
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);


// --- XUẤT ỨNG DỤNG CHO MÔI TRƯỜNG SERVERLESS ---
// Serverless Function yêu cầu bạn xuất ứng dụng Express thay vì lắng nghe cổng
// Tên 'handler' hoặc 'default' là quy ước cho builder @vercel/node
export default app;
// Hoặc, nếu sử dụng tên tệp khác ngoài index.js, bạn có thể xuất là module.exports
// module.exports = app;

// XÓA DÒNG NÀY: app.listen(PORT, ()=> console.log(`Server listening at http://localhost:${PORT}`));
