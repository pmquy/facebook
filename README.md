# 🚀 Enterprise-Grade Social Media Platform

A high-performance, scalable social networking platform built with a modern tech stack. This project demonstrates advanced backend architecture, real-time communication, and professional DevOps practices.

---

## 🌟 Features & Technical Implementation

Dưới đây là danh sách chi tiết tất cả các tính năng và kỹ thuật (tech stack) được áp dụng trong dự án:

### 👤 1. Identity & Security (Quản lý định danh & Bảo mật)
- **Tính năng:** Đăng ký, Đăng nhập, Quản lý phiên làm việc (Session) an toàn, Phân quyền người dùng.
- **Kỹ thuật áp dụng:**
  - **Stateless Authentication:** Sử dụng **JSON Web Tokens (JWT)** để xác thực không lưu trạng thái trên server.
  - **Password Hashing:** Mã hóa mật khẩu một chiều sử dụng thuật toán **Bcrypt** với salt rounds = 10.
  - **Request Validation:** Chuẩn hóa và xác thực dữ liệu đầu vào (Payload Validation) thông qua middleware **Joi**, ngăn chặn NoSQL Injection và dữ liệu rác.
  - **Environment Configuration:** Quản lý cấu hình nhạy cảm qua biến môi trường (`dotenv`), tách biệt config giữa Dev và Prod.
  - **CORS & Cookies:** Quản lý chia sẻ tài nguyên chéo nguồn (`cors`) và phân tích cookies (`cookie-parser`).

### 🌐 2. Social Graph & Networking (Mạng lưới quan hệ)
- **Tính năng:** Kết bạn (Gửi/Nhận/Từ chối yêu cầu), Hủy kết bạn, Quản lý danh sách bạn bè, Tạo & Quản lý Nhóm (Groups).
- **Kỹ thuật áp dụng:**
  - **Complex Database Schema:** Thiết kế lược đồ **MongoDB** (thông qua **Mongoose**) tối ưu cho dữ liệu quan hệ chéo (Sử dụng `ref` và `populate`).
  - **Transactional Operations:** Xử lý các nghiệp vụ cập nhật nhiều document cùng lúc.
  - **Service Layer Pattern:** Tách biệt Business Logic khỏi Controller, giúp code dễ test và bảo trì.

### 📝 3. Content Delivery & Interactions (Quản lý Nội dung)
- **Tính năng:** Đăng bài (Post), Chỉnh sửa, Xóa; Bình luận đa cấp (Nested Comments); Tương tác (Like bài viết, Like comment); Chia sẻ (Share bài viết).
- **Kỹ thuật áp dụng:**
  - **Aggregation Pipeline:** Sử dụng các truy vấn tổng hợp phức tạp của Mongoose/MongoDB để tính toán lượt Like, Comment, và join dữ liệu user trong một lần truy vấn.
  - **Caching Strategy:** Sử dụng **Redis** làm In-memory Data Store để cache các dữ liệu tĩnh hoặc dữ liệu query nặng, tối ưu hiệu suất.
  - **Multipart Data Handling:** Quản lý upload file và hình ảnh thông qua middleware **Multer**, xử lý buffer và lưu trữ.
  - **Data Fetching & State Management:** Sử dụng **React Query** ở Frontend để quản lý state server, caching, và đồng bộ dữ liệu mượt mà.

### 💬 4. Real-time Communication (Giao tiếp thời gian thực)
- **Tính năng:** Chat cá nhân (1-1), Chat nhóm (Group Chat), Thông báo (Notifications) theo thời gian thực (Push Notifications), Hiển thị trạng thái Online/Offline.
- **Kỹ thuật áp dụng:**
  - **WebSocket Protocol:** Triển khai kết nối hai chiều liên tục bằng **Socket.io** (cả Server và Client `socket.io-client`).
  - **Event-Driven Architecture:** Kiến trúc hướng sự kiện, server chủ động push data xuống client.
  - **Socket Rooms & Namespaces:** Quản lý luồng tin nhắn đa nhóm bằng cơ chế Room, broadcast tin nhắn chính xác.
  - **Socket Authentication:** Xác thực JWT ngay tại bước bắt tay (handshake) để chặn các kết nối không hợp lệ.

### 🎮 5. Multiplayer Game (Trải nghiệm tương tác)
- **Tính năng:** Tích hợp mini-game Cờ Caro (Gomoku) chơi trực tuyến giữa 2 người.
- **Kỹ thuật áp dụng:**
  - **State Synchronization:** Đồng bộ hóa trạng thái bàn cờ (Game State) giữa hai client trong thời gian thực.
  - **Concurrency Handling:** Quản lý luồng dữ liệu đồng thời khi nhiều cặp người chơi đang chơi cùng lúc.

### 🎨 6. User Interface & Experience (Giao diện & Trải nghiệm)
- **Tính năng:** Giao diện Responsive (tương thích Mobile/Desktop), Client-side Routing, Thông báo người dùng (Toasts).
- **Kỹ thuật áp dụng:**
  - **UI Framework/Library:** Xây dựng bằng **React 18** kết hợp với **Vite** để tăng tốc độ build và HMR.
  - **Styling:** Sử dụng **Tailwind CSS** (với PostCSS, Autoprefixer) để thiết kế UI nhanh chóng và hiện đại.
  - **Routing:** Quản lý điều hướng trang ở client bằng **React Router DOM v6**.
  - **Alerts/Toasts:** Sử dụng **React Toastify** để hiển thị thông báo thân thiện.

---

## 🏗 System Architecture & DevOps

Bên cạnh tính năng, hệ thống được thiết kế theo tiêu chuẩn sản phẩm thương mại:

- **API Versioning (v1):** Định tuyến API RESTful rõ ràng (ví dụ: `/api/v1/`), sử dụng **Express** làm Web Framework.
- **Containerization (Docker):** Đóng gói toàn bộ hệ thống bằng **Docker** & **Docker Compose**. Định nghĩa các services: `fb_frontend`, `fb_backend`, `mongo`, `redis`, `nginx` với hệ thống mạng nội bộ.
- **Reverse Proxy & Load Balancing (Nginx):** 
  - Điều phối lưu lượng cho cả Frontend và Backend.
  - Proxy an toàn cho HTTP requests và WebSocket upgrades (`Connection: Upgrade`).
- **Continuous Integration (GitLab CI):** 
  - CI/CD Pipeline thiết lập qua `.gitlab-ci.yml` sử dụng `docker:dind` (Docker in Docker).
  - Tự động hóa các stages: test, deploy.
- **Logging:** Sử dụng **Morgan** ở backend để ghi log các HTTP request.
- **Quality Assurance & Testing:**
  - **Backend Testing:** Sử dụng **Mocha** làm test runner và **Chai**, **Chai-HTTP** để viết Unit/Integration Tests.
  - **Frontend Testing:** Cấu hình **Vitest** kết hợp với **React Testing Library** và **JSDOM** để kiểm thử components. Linter với **ESLint**.

---

## 🛠 Tech Stack Overview

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, React Query, React Router v6, React Toastify |
| **Backend** | Node.js (ES Modules), Express, Socket.io, Multer, Morgan, Cors |
| **Database & Cache** | MongoDB (Mongoose ORM), Redis |
| **Security & Validation** | JWT (JSON Web Tokens), Bcrypt, Joi, Cookie-Parser |
| **Testing** | Backend: Mocha, Chai / Frontend: Vitest, React Testing Library, JSDOM |
| **Code Quality** | ESLint |
| **DevOps & Infra** | Docker, Docker Compose, Nginx, GitLab CI/CD |

---

## 🚀 Quick Start

1. **Clone repository:** `git clone <repo>`
2. **Cấu hình môi trường:** Tạo file `.env` theo `env.js` (hoặc `.env.example`).
3. **Chạy hệ thống bằng Docker:**
   ```bash
   docker-compose up --build -d
   ```
4. Môi trường phát triển hỗ trợ **Watch & Sync** (Docker Compose Watch): Tự động rebuild hoặc sync code (front-end và back-end) khi có thay đổi.
5. Hệ thống sẽ tự động khởi tạo mạng kết nối Frontend (Port 80), Nginx Proxy (Port 81), Backend, Mongo và Redis.
