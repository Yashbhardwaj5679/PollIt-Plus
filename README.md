# PollIt++ 🗳️  
> A production-grade, scalable **real-time voting platform** built with Node.js, React, Kafka, and MongoDB.  
> Showcasing **WebSocket scaling, event-driven architecture, database optimization, and beautiful UI/UX**.

![GitHub repo size](https://img.shields.io/github/repo-size/Yashbhardwaj5679/PollIt-Plus)
![GitHub last commit](https://img.shields.io/github/last-commit/Yashbhardwaj5679/PollIt-Plus)
![Issues](https://img.shields.io/github/issues/Yashbhardwaj5679/PollIt-Plus)
![Pull Requests](https://img.shields.io/github/issues-pr/Yashbhardwaj5679/PollIt-Plus)
![License](https://img.shields.io/badge/license-MIT-green)
![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%20%7C%20Node.js%20%7C%20MongoDB%20%7C%20Kafka%20%7C%20Redis-blue)

---

## 🚀 Features
- **Instant Polls** – Create and share polls with unique links or codes  
- **Real-Time Results** – Live updates with **Socket.IO** (no page reloads)  
- **Animated Charts** – Smooth result transitions with **Recharts**  
- **Fraud Prevention** – IP + device tracking + JWT tokens  
- **Authentication** – Email/password + Google OAuth  
- **Poll History** – Persistent poll storage for users  
- **Admin Dashboard** – Analytics (total votes, participation trends, peak times)  
- **Scalable Backend** – Event-driven with **Kafka**, caching with **Redis**  
- **Secure** – JWT, Helmet.js, CORS, and rate limiting  
- **Responsive Design** – Works on mobile, tablet, and desktop  
- **Dark Mode** 🌙 – Toggle between light and dark themes  

---

## 🏗️ System Architecture

Frontend (React + Redux + Tailwind)
|
v
Backend (Node.js + Express + JWT) ----> MongoDB (Indexed)
|
v v
Socket.IO (Realtime) Redis (Cache)
|
v
Kafka (Event Bus) --> Scalable Consumers

---

## 🛠️ Tech Stack

**Frontend**  
- React (latest) + Tailwind CSS  
- Redux Toolkit (state management)  
- Axios (API calls)  
- Recharts (animated charts)  

**Backend**  
- Node.js + Express  
- MongoDB + Mongoose (indexes for fast queries)  
- Socket.IO (real-time communication)  
- Kafka (event-driven architecture for scale)  
- Redis (caching)  
- JWT Authentication + Google OAuth  
- Joi/Zod (validation)  

**DevOps**  
- Docker (containerization)  
- Kubernetes (orchestration)  
- GitHub Actions (CI/CD)  
- Azure App Service + Azure CosmosDB (Mongo API) + AKS  

**Quality & Security**  
- Jest + Supertest (unit + integration tests)  
- k6 (load testing & scalability benchmarks)  
- Helmet.js, CORS, dotenv  

---

## 📸 Screenshots

> *(Add screenshots here)*  

- Poll creation page  
- Live voting screen  
- Animated chart updates  
- Admin dashboard  

---

## ⚙️ Setup & Installation

### 🔹 Clone the repo
```bash
git clone https://github.com/Yashbhardwaj5679/PollIt-Plus.git
cd PollIt-Plus
🔹 Backend Setup
cd backend
npm install
cp .env.example .env
npm run dev
🔹 Frontend Setup
cd frontend
npm install
cp .env.example .env
npm start
🔹 Docker (Full stack)
docker-compose up --build

🔹Kubernetes (Advanced)
kubectl apply -f k8s/
✅ Testing
Unit & Integration Tests
npm run test
Load Testing (k6)
k6 run load-test.js


----
📖 API Documentation

Swagger available at /api/docs

Auth: JWT tokens (Bearer)
------


📊 Analytics & Admin Dashboard

Total votes per poll

Participation over time (line chart)

Peak active voting window
---------
🤝 Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
---
👨‍💻 Author

Yash Bhardwaj
