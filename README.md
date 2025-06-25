
# 🩺 BookMyDoctor – Online Appointment Booking System

## 🧭 Project Overview
**BookMyDoctor** is a web-based appointment booking system made specifically for **local doctors** and **private clinics**, especially in **semi-urban and rural areas**. It's **not** a hospital management system — rather, it's a digital bridge between patients and nearby offline clinics for easier scheduling.

---

## 🎯 Project Objective
The aim is to help people **find local doctors easily** and **book offline appointments** from the comfort of home. It also helps doctors manage their bookings without disrupting their existing offline practice.

## 📌 Description

**BookMyDoctor** is a web-based appointment booking platform that helps users easily find doctors, schedule appointments, and access medical services online. The system supports secure login for patients, doctors, and administrators.

---

## 🚀 Live Demo

[🔗 Visit Website](https://bookmydoctor.vercel.app) *(Replace with actual deployed URL if available)*

---

## 🧰 Tech Stack

### 💻 Frontend
- **HTML5**
- **CSS3** (Modular, Responsive, Media Queries)
- **JavaScript** (Vanilla JS, DOM manipulation)
- **GSAP** (Scroll animations)
- **SVG Icons**

### 🛠️ Backend
- **Node.js**
- **Express.js**
- **MongoDB** + **Mongoose**
- **bcrypt.js** (for password encryption)
- **jsonwebtoken (JWT)** (for authentication)
- **dotenv** (for environment variables)

---

## 🗂️ Folder Structure

### 📁 Frontend

```
Frontend/
├── Assets/              # Images, icons, background assets
├── css/                 # Modular CSS files
├── js/                  # All JavaScript files per page
├── pages/               # HTML pages (login, register, dashboard, etc.)
├── components/          # Navbar and reusable HTML components
└── index.html           # Main Landing Page
```

### 📁 Backend

```
Backend/
├── config/              # MongoDB configuration
├── controllers/         # Logic for routes
├── middleware/          # Auth middleware (JWT, role checking)
├── models/              # MongoDB Schemas (User, Appointment)
├── routes/              # Route endpoints
├── utils/               # Helper functions
├── .env                 # Environment secrets
├── .gitignore           # Ignored files
├── package.json         # Project dependencies
└── server.js            # Main entry file
```

---

## 👥 User Roles

- **Admin** – Manage users, doctors
- **Doctor** – View dashboard, approve appointments
- **Patient** – Book appointments, view history

---

## 🔐 Authentication

- **JWT (JSON Web Token)** – for secure login sessions
- **bcrypt.js** – to hash and store passwords securely
- Protected routes with role-based access using custom middleware

---

## ✅ Features

- 🔍 Doctor listing (with dummy data)
- 📅 Appointment form and schedule
- 🔐 Login/Register for Patient, Doctor, Admin
- 📱 Fully responsive and mobile-friendly UI
- 💡 Scroll-based animations using GSAP
- 🧾 Basic dashboards (extendable)

---

## ⚙️ Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/bookmydoctor.git
```

### 2. Install backend dependencies
```bash
cd Backend
npm install
```

### 3. Setup `.env` file
Create a `.env` file inside `Backend/`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookmydoctor
JWT_SECRET=your_jwt_secret
```

### 4. Start the backend server
```bash
npm start
```

### 5. Open frontend
Open `Frontend/index.html` in your browser or use a Live Server extension in VS Code.

---

## 🧾 .gitignore

```
node_modules/
.env
.vscode/
.DS_Store
```

---

## 👨‍💻 Author



---

## 📸 Screenshots (Optional)

> You can include screenshots of:
> - Home Page  
> - Find Doctor  
> - Login/Register  
> - Dashboard views

---

## 🏁 Conclusion

This project demonstrates a complete full-stack web application using Node.js and MongoDB with clean frontend integration. It includes responsive design, user authentication, and a scalable backend structure.

---
