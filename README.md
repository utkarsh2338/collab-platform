# 🚀 Collab Platform – Real-Time Team Collaboration App

A full-stack real-time collaboration platform built using **React + Vite + Tailwind**,  
**Node.js + Express + Sequelize**, and **PostgreSQL**, featuring authentication, tasks,  
Kanban boards, activity timelines, dark mode, and real-time updates.

---

## 🔗 Live Demo

### 🌐 Frontend (Vercel)
https://collab-platform-eta.vercel.app

### 🛠 Backend (Render)
https://collab-platform-mvko.onrender.com

---

## 🏷️ Badges

![Vercel](https://img.shields.io/badge/Frontend-Vercel-blue?logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-purple?logo=render)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)
![Node](https://img.shields.io/badge/Node.js-green?logo=node.js)
![React](https://img.shields.io/badge/React-61DAFB?logo=react)
![MIT License](https://img.shields.io/badge/License-MIT-yellow)

---

# ✨ Features

### 🔐 Authentication
- Register / Login  
- JWT Authentication  
- Forgot Password + Reset Password  
- OAuth support (Google, GitHub)  
- Authorization using tokens  

### 📊 Projects & Tasks
- Create and manage multiple projects  
- Add / Edit / Delete tasks  
- Drag-and-drop Kanban board  
- Activity timeline history  

### 👥 Team Collaboration
- Real-time updates using Socket.io  
- Team member management  
- Project sharing  
- Live task updates  

### 🎨 UI/UX
- Modern Tailwind-based UI  
- Light/Dark mode  
- Optimized layout  
- Responsive design  

---

# 🏗️ Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS  
- Axios  
- Context API  
- Socket.io Client  

### **Backend**
- Node.js + Express  
- PostgreSQL  
- Sequelize ORM  
- JWT + Bcrypt  
- Nodemailer (Email)  
- Socket.io  

### **DevOps / Deployment**
- Frontend → Vercel  
- Backend → Render  
- Database → Render PostgreSQL  

---

# 📁 Folder Structure

```md
collab-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── scripts/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env
│
└── README.md
