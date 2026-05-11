# 🚀 Enterprise-Grade Social Media Platform (Facebook Clone)

A highly scalable, feature-rich social networking platform built with a modern distributed architecture. This project comprehensively demonstrates both foundational social networking features (CRUD, Authentication, Graph connections) and advanced engineering practices (**AI/ML Recommendation Engines**, **WebRTC Live Streaming**, **Real-time Event-Driven Architecture**, and **Microservices Orchestration**).

---

## 🌟 Comprehensive Features & Technical Implementation

Hệ thống được thiết kế đầy đủ các tính năng của một mạng xã hội thực tế, kết hợp với các công nghệ chuyên sâu:

### 🧠 1. AI-Powered Recommendation Engine (Python Microservice)
- **Tính năng:** Đề xuất bài viết (News Feed) thông minh được cá nhân hóa, dự đoán sở thích dựa trên hành vi người dùng, thời gian xem, và các mối quan hệ mạng lưới.
- **Kỹ thuật áp dụng:**
  - **Hybrid Recommendation Model:** Kết hợp sức mạnh của 3 thuật toán trong một microservice bằng Flask:
    - **Content-Based Filtering (CBF):** Sử dụng `SentenceTransformer` (SBERT) trích xuất đặc trưng văn bản và tính `Cosine Similarity`.
    - **Graph-Based Scoring (EdgeRank & PageRank):** Phân tích đồ thị kết nối bạn bè bằng `NetworkX`, chấm điểm tương tác (Like, Share, Watch Time) theo trọng số.
    - **Deep Collaborative Filtering (CF):** Xây dựng mạng nơ-ron sâu với `TensorFlow/Keras` (Embedding, Dropout, Dense) để học sâu thói quen người dùng.
  - **Dynamic Weighting:** Thuật toán tự điều chỉnh hệ số $(\alpha, \beta)$ pha trộn giữa CF, CBF và EdgeRank tùy thuộc vào độ lớn mạng lưới và hành vi.

### 🎥 2. WebRTC Live Streaming & Real-time Communication
- **Tính năng:** Phát trực tiếp (Live Stream), Chat cá nhân (1-1), Chat nhóm, và Push Notifications thời gian thực.
- **Kỹ thuật áp dụng:**
  - **Peer-to-Peer Streaming:** Triển khai **WebRTC** (`RTCPeerConnection`, `RTCIceCandidate`) kết hợp hệ thống STUN/TURN servers cho luồng video/audio độ trễ siêu thấp.
  - **WebSocket Signaling:** Sử dụng **Socket.io** làm Signaling Server để thiết lập bắt tay WebRTC, đồng thời quản lý trạng thái Online/Offline, và broadcast tin nhắn chat/thông báo theo cơ chế `Rooms/Namespaces`.

### 📝 3. Core Social Features & Content Delivery
- **Tính năng:** Đăng bài (Post đa phương tiện), Bình luận đa cấp (Nested Comments), Tương tác (Like, Thả cảm xúc), Chia sẻ bài viết, và Bình chọn (Polling).
- **Kỹ thuật áp dụng:**
  - **Advanced Aggregation & Pagination:** Tận dụng tối đa sức mạnh của **MongoDB/Mongoose** để tính toán tổng lượt Like, số lượng Comment, và join dữ liệu người dùng chỉ trong một truy vấn duy nhất, kết hợp **Infinite Scrolling/Pagination** trên Frontend.
  - **Data Fetching & State Management:** Sử dụng **React Query** trên Frontend để quản lý state, caching tự động, tối ưu hóa quá trình fetch dữ liệu liên tục.
  - **Cloud Media Management:** Tích hợp middleware **Multer** và lưu trữ file/hình ảnh tĩnh thông qua **Cloudinary** để tối ưu hóa việc phân phối nội dung (CDN).

### 📸 4. Event-Driven Stories & Group Events
- **Tính năng:** Đăng Story (tin biến mất sau 24h), quản lý Sự kiện (Events) của Group, quản lý danh sách người tham gia (Attendees).
- **Kỹ thuật áp dụng:**
  - **Message Broker / Async Tasks:** Tích hợp **RabbitMQ** (Fanout Exchange) để phân phối sự kiện tạo Story đến Feed của toàn bộ bạn bè một cách bất đồng bộ mà không gây nghẽn server.
  - **Fast Feed Retrieval:** Lưu trữ danh sách Story theo thời gian thực trên **Redis List**, giúp truy xuất cực nhanh thay vì truy vấn trực tiếp vào Database.

### 👤 5. Identity, Security & Complex Graph Operations
- **Tính năng:** Quản lý Người dùng, Đăng ký/Đăng nhập, Kết bạn (Chấp nhận/Từ chối yêu cầu), Tạo & Quản lý Phân quyền Nhóm (Groups với các tab như Posts, Connections, Media, Events).
- **Kỹ thuật áp dụng:**
  - **Security:** Stateless Authentication bằng **JSON Web Tokens (JWT)**, mã hóa mật khẩu một chiều với **Bcrypt**, và bảo vệ endpoint bằng **Joi** (Payload Validation), tích hợp **CORS** và **Cookie-Parser**.
  - **Database Design:** Xây dựng schema tối ưu cho dữ liệu quan hệ chéo (Cross-relational data) với Mongoose `ref` và xử lý **Transactional Operations** khi cập nhật trạng thái bạn bè đồng thời.

### 🎮 6. Interactive Minigames & Personal Productivity
- **Tính năng:** Chơi mini-game trực tuyến (Cờ Caro - Gomoku) và Bảng ghi chú cá nhân (Sticky Notes).
- **Kỹ thuật áp dụng:**
  - **Game State Synchronization:** Đồng bộ trạng thái bàn cờ đồng thời giữa các clients thông qua sự kiện Socket.io.
  - **DOM Drag & Drop:** Cung cấp trải nghiệm kéo-thả vật lý mượt mà cho Sticky Notes sử dụng React Refs và lưu trữ tọa độ qua `Local Storage`.

### 🎨 7. User Interface & Experience (UI/UX)
- **Tính năng:** Giao diện Responsive toàn diện (tương thích Mobile/Tablet/Desktop), Client-side Routing, Thông báo người dùng mượt mà.
- **Kỹ thuật áp dụng:**
  - **Frontend Core:** Xây dựng trên nền tảng **React 18** và **Vite** mang lại tốc độ build thần tốc và Hot-Module-Reload hoàn hảo.
  - **Styling:** Sử dụng hệ thống tiện ích của **Tailwind CSS v4** kết hợp cùng Ant Design / MUI.
  - **Routing & Feedback:** Sử dụng **React Router DOM v6** cho việc điều hướng và **React Toastify** cho thông báo người dùng.

---

## 🏗 System Architecture & DevOps

Hệ thống được thiết kế theo hướng **Microservices** và **Containerization** đáp ứng tiêu chuẩn triển khai sản phẩm thương mại thực tế:

- **API Gateway & Load Balancing:** Cấu hình **Nginx** làm Reverse Proxy (`nginx:alpine`), điều phối lưu lượng HTTP request thông thường và hỗ trợ Proxy cho WebSocket upgrades (`Connection: Upgrade`).
- **Container Orchestration:** 
  - Toàn bộ các mảnh ghép của hệ thống (Frontend, Core-Backend, AI-Recommend-Service, MongoDB, Redis, Nginx) được đóng gói và kết nối với nhau qua mạng ảo nội bộ (`app_network`) bằng **Docker & Docker Compose**.
  - Thiết lập Multi-stage builds (`Dockerfile.dev`, `Dockerfile.prod`) cho các môi trường khác nhau. Tích hợp tính năng **Docker Compose Watch** phục vụ tự động đồng bộ mã nguồn khi code (Hot-reload) trong quá trình phát triển.
- **CI/CD Pipeline:** Tự động hóa hoàn toàn với **GitLab CI/CD** (sử dụng kiến trúc Docker-in-Docker `dind`). Tự động chạy Unit/Integration Tests bằng **Mocha/Chai** (Backend) và **Vitest/React Testing Library** (Frontend) trước khi Deploy.
- **Logging:** Ghi log HTTP Requests tập trung bằng **Morgan**.

---

## 🛠 Exhaustive Tech Stack

| Layer                 | Core Technologies                                               |
| :-------------------- | :-------------------------------------------------------------- |
| **Frontend UI/UX**    | React 18, Vite, Tailwind CSS v4, Ant Design / MUI, React Toastify |
| **State & Routing**   | React Query, React Router DOM v6, React Context                 |
| **Core Backend**      | Node.js (ESM), Express, Socket.io, Multer, Morgan, CORS, Cookie |
| **AI / Recommend**    | Python, Flask, TensorFlow/Keras, Scikit-learn, NetworkX, Pandas, SBERT |
| **Databases**         | MongoDB (Mongoose ORM)                                          |
| **Cache & Queue**     | Redis, RabbitMQ                                                 |
| **Streaming / Media** | WebRTC, Cloudinary                                              |
| **Security & QA**     | JWT, Bcrypt, Joi, ESLint, Mocha/Chai, Vitest                    |
| **Infra & DevOps**    | Docker, Docker Compose, Nginx, GitLab CI/CD (dind)              |

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
