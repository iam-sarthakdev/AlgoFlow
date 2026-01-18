# AlgoFlow

<div align="center">

![AlgoFlow Banner](https://img.shields.io/badge/AlgoFlow-Master%20DSA%20The%20Smart%20Way-blueviolet?style=for-the-badge)

**A scientifically-proven spaced repetition system for mastering Data Structures & Algorithms**

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-Click%20Here-success?style=for-the-badge&logo=vercel)](https://algo-flow-sarthak-kanois-projects.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/iam-sarthakdev/AlgoFlow)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Deployment](#-deployment)

</div>

---

## 🎯 Problem Statement

Interview preparation is hard. Most developers solve problems once and forget them. **AlgoFlow** solves this by implementing the **Forgetting Curve** algorithm, scheduling reviews at scientifically optimal intervals to maximize retention.

## ✨ Features

### 🧠 Smart Problem Management
- **Spaced Repetition Algorithm**: Problems resurface at calculated intervals (1, 3, 7, 14, 30 days)
- **Automated Reminders**: Daily cron jobs update problem statuses (Pending, Overdue, Completed)
- **Company Tags**: Filter problems by top tech companies (Google, Meta, Amazon, etc.)
- **Pattern Recognition**: Categorize by algorithm patterns (Sliding Window, Two Pointers, etc.)
- **Difficulty Tracking**: Easy, Medium, Hard classification with progress analytics

### 📊 Advanced Analytics
- **Streak Tracking**: Monitor daily engagement and longest streaks
- **Visual Progress**: Interactive charts showing completion rates by difficulty
- **Topic Breakdown**: Heatmaps for topics needing attention
- **Performance Metrics**: Total problems solved, revision count, consistency score

### 🏗️ System Design Mastery
- **Complete Study Guide**: Comprehensive notes from `donnemartin/system-design-primer`
- **Progress Tracking**: Mark topics as completed with real-time progress bar
- **15+ Topics Covered**: Scalability, CAP Theorem, Load Balancers, DNS, CDN, Caching, etc.
- **8+ Real Problems**: Design Twitter, Pastebin, Web Crawler, Mint.com, and more
- **Rich Markdown Rendering**: Syntax-highlighted code, diagrams, tables, and alerts

### 🔐 Secure Authentication
- **JWT-based Auth**: Secure token-based authentication with HTTP-only cookies
- **Protected Routes**: Client-side and server-side route protection
- **User Profiles**: Customizable settings and preferences

### 🎨 Modern UI/UX
- **Dark Mode**: Sleek glassmorphism design with gradient accents
- **Responsive**: Fully optimized for desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion transitions and micro-interactions
- **Accessibility**: Keyboard navigation and screen reader support

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering with syntax highlighting
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Node-Cron** - Scheduled jobs for reminders

### DevOps & Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting
- **MongoDB Atlas** - Cloud database
- **Git & GitHub** - Version control

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client (React)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │   Problems   │  │System Design │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Analytics   │  │  Companies   │  │    Auth      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                    HTTPS (REST API)
                            │
┌─────────────────────────────────────────────────────────────┐
│                      Express.js Server                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              JWT Authentication Middleware            │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Problems │  │   Auth   │  │Analytics │  │ System   │   │
│  │Controller│  │Controller│  │Controller│  │  Design  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                      Mongoose ODM
                            │
┌─────────────────────────────────────────────────────────────┐
│                      MongoDB Atlas                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  Users   │  │ Problems │  │Revisions │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (free tier)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/iam-sarthakdev/AlgoFlow.git
cd AlgoFlow
```

2. **Install dependencies**
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. **Environment Variables**

Create `.env` files:

**`server/.env`**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/algoflow
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

**`client/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Run the application**

**Option 1: Using the startup script (Windows)**
```bash
# From the root directory
start_app.bat
```

**Option 2: Manual start**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

5. **Access the app**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

---

## 📁 Project Structure

```
AlgoFlow/
├── client/                # React frontend
│   ├── public/
│   │   └── system-design-data/  # Static markdown content
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── services/      # API calls
│   │   ├── context/       # React Context (Auth)
│   │   └── App.jsx        # Main app component
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Express backend
│   ├── src/
│   │   ├── config/        # Database connection
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth, error handling
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── jobs/          # Cron jobs
│   │   └── server.js      # Entry point
│   └── package.json
│
├── start_app.bat          # Startup script
└── README.md
```

---

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set Root Directory: `client`
4. Add environment variable: `VITE_API_URL=https://your-backend-url/api`
5. Deploy

### Backend (Railway)
1. Create new project on [Railway](https://railway.app)
2. Connect your GitHub repo
3. Set Root Directory: `server`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT=5000`
5. Deploy
6. Generate domain for public access

---

## 🎓 Key Learning Outcomes

Building AlgoFlow demonstrates mastery in:
- **Full-Stack Development**: End-to-end application architecture
- **Database Design**: Schema modeling, relationships, and indexing
- **Authentication**: Secure JWT implementation
- **State Management**: React Context API and local state
- **API Design**: RESTful endpoints with proper error handling
- **Responsive Design**: Mobile-first approach with modern CSS
- **DevOps**: CI/CD pipelines, environment management, cloud deployment
- **Algorithm Knowledge**: Spaced repetition, scheduling algorithms

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sarthak Kanoi**

- GitHub: [@iam-sarthakdev](https://github.com/iam-sarthakdev)
- Live Demo: [AlgoFlow](https://algo-flow-sarthak-kanois-projects.vercel.app/)

---

## 🙏 Acknowledgments

- System Design content derived from [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer)
- Spaced Repetition algorithm based on the Forgetting Curve research by Hermann Ebbinghaus
- UI inspiration from modern SaaS applications

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ for interview preparation

</div>
