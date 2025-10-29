# Movie Ticket Booking Management Website - OwlCinema
## Mục lục
1. [Giới thiệu](#giới-thiệu)
2. [Tính năng](#tính-năng)
3. [Công nghệ](#công-nghệ)
4. [Cách cài đặt](#cách-cài-đặt)
5. [Nhóm phát triển](#nhóm-phát-triển)
## Giới thiệu
 -Web App làm nhiệm vụ đặt vé xem phim cũng như quản lý vé xem phim.
 ## Tính năng
 ### Tổng quan
 - **Giao diện** thân thiện trực quan, dễ điều hướng
- **Backend và hệ thống quản lý phiên đăng nhập** bằng Token bảo mật, chặt chẽ. Theo dõi hoạt động của người dùng (sử dụng Clerk)
 ### Nhóm tính năng của admin
- **Hệ thống thêm, sửa phim**
  - Admin có thể thêm phim với giá và ngày giờ cụ thể.
  - Lưu trữ dữ liệu vào Mongodb. 
- **Hệ thống cập nhật dữ liệu**
  - Admin có thể biết được tổng doanh thu, số lượng users, số lượng phim đang hoạt động(dữ liệu thực được xử lý thật ở BE)
  - Admin cũng có thể biết được thông tin chi tiết về thông tin user đặt vé và thông tin cụ thể của các bộ phim đang hoạt động
### Nhóm tính năng của user
- **Hệ thống thêm, xóa những bộ phim yêu thích, đặt vé và thanh toán**
  - Users có thể lưu trữ những bộ phim yêu thích vào trang **Favorites**
  - Users có thể biết thông tin chi tiết của các bộ phim
  - Users có thể đặt vé xem phim, thanh toán online qua Stripe.
  - Nếu Users không thanh toán sau 15p thì vé sẽ bị hủy.

   ## Công nghệ

**Kiến trúc:** Client - Server Web Application

**Front-end:** React.js, Clerk, Tailwindcss và một số thư viện khác...

**Back-end:** Node.js, Expressjs, MongoDB (database), Inngest, Clerk và một số thư viện khác...

**Giao thức sử dụng:** HTTP Request + Axios

**Ngôn ngữ**: JavaScript, HTML, CSS


## Cách cài đặt

### 1. Tải mã nguồn từ repo này

Yêu cầu cài sẵn Node.js và MongoDB trên hệ điều hành (Đã khởi động sẵn)


### 2. Chuẩn bị 2 Terminal/PowerShell CLI, ``cd`` đến gốc của source code và gõ lệnh sau:

**Client terminal**
```
cd client
npm install
npm run dev
```
Front-end sẽ chạy ở địa chỉ http://localhost:5173

**Server terminal**
```
cd server
npm install
npm start
```
Back-end sẽ chạy ở địa chỉ http://localhost:3000

## Nhóm phát triển

### Nhóm 9


- **Vũ Đoàn Gia Huy** (MaSV: 242630945)

   System Design, Back-end(core), Front-end, UI/UX, React Router, Upload, State, Refinements, Reports


- **Hoàng Bảo Uyên** (MaSV:242630986)
   Reports, Design(core), Front-end, UI/UX


- **Phan Nhật Phương Thảo** (MaSV:242630975)

   Front-end (core), UI/UX, State, Design, Reports


- **Đặng Xuân Duy** (MaSV:242630915)
  
  Report (core), Front-end, UI/UX, 
