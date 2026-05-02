# DevTinder Backend 🚀

Backend service for DevTinder – a developer networking platform where users can connect, send requests, and manage profiles.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- HTTP-only Cookies
- bcrypt (Password Hashing)
- Validator (Data Validation)
- CORS
- dotenv

---

## ✨ Features

- User Authentication (Signup, Login, Logout)
- Secure JWT-based authentication using cookies
- Profile Management (View & Edit)
- Send / Accept / Reject Connection Requests
- View Connections
- Developer Feed API
- Input validation and error handling
- Protected routes with middleware

---

## 📂 API Endpoints

### Auth
- POST `/signup`
- POST `/login`
- POST `/logout`

### Profile
- GET `/profile`
- PATCH `/profile/edit`

### Connections
- POST `/request/send`
- POST `/request/review`
- GET `/connections`
- GET `/requests`

### Feed
- GET `/feed`

---

## 🔐 Authentication Flow

- User logs in → JWT token generated  
- Token stored in HTTP-only cookie  
- Middleware verifies token for protected routes  

---

## ⚙️ Setup Instructions

1. Clone the repo:
git clone https://github.com/poojarajegowda/DevTinder-project
cd devtinder-backend
2. Install dependencies:
npm install
3. create .env file:
PORT=7777
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
4. Run the server:
npm run dev