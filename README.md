# Local Development Setup

## Backend

1. Create `backend/.env` with:

```
DB_URL=mongodb://localhost:27017/alzheimer
JWT_SECRET=replace_with_a_strong_secret
PORT=3000
FRONTEND_URL=http://localhost:5173
```

2. Install deps and run:

```
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:3000`.

## Frontend

1. Optionally create `frontend/.env`:

```
VITE_BACKEND_URL=http://localhost:3000
```

2. Install deps and run:

```
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

<h1 align="center">🧠 Alzheimer – Your Second Brain</h1>

<p align="center">
  <b>Alzheimer</b> is a "Second Brain" application that lets you collect and organize content from multiple sources — such as <b>Twitter</b>, <b>YouTube</b>, and <b>Google Docs</b> — into a centralized knowledge hub.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2F%20Next.js-blue?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/Backend-TypeScript%20%2B%20Node.js-green?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge"/>
</p>

---

## ✨ Features

- 💡 **Collect Content** – Save content from Twitter, YouTube, and Google Docs
- 🗂 **Organize Knowledge** – Tag and categorize information efficiently
- 🧠 **Second Brain** – Centralized hub for all your important knowledge
- 🔄 **Sync Across Sessions** – Keep your data available across devices
- ⚡ **Fast & Scalable** – Built with modern web technologies

---

## 🛠 Tech Stack

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| **Frontend**     | React • Next.js                             |
| **Backend**      | TypeScript • Node.js • Express              |
| **Database**     | MongoDB                                     |
| **Integrations** | Twitter API • YouTube API • Google Docs API |
| **Deployment**   | Vercel • Railway • Docker                   |

---

## 🚀 Getting Started

1. Clone the repo

```bash
git clone https://github.com/rishabhdamle/Alzheimer.git
cd Alzheimer
```

2. Backend setup

```bash
cd backend
npm install
# create .env as documented above, then
npm run dev
```

3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Now visit http://localhost:5173 and the app will talk to http://localhost:3000.
