# Alzheimer – Second Brain Application

Alzheimer is a Second Brain application that helps users collect, organize, and manage knowledge from multiple sources like Twitter, YouTube, and Google Docs in one centralized place.

This project focuses on building a real-world knowledge management system that emphasizes content organization, tagging, and seamless access across sessions using a modern full-stack architecture.

## Problem Statement

In today’s fast-paced digital world, valuable information is scattered across multiple platforms.
Bookmarks get lost, notes become unstructured, and important insights are hard to retrieve when needed.

Alzheimer aims to solve this by providing:

- A centralized hub for saving knowledge

- Structured organization using tags and categories

- Easy access to information across sessions and devices

## Features

### Content Collection

- Save content from Twitter, YouTube, and Google Docs

- Store useful links and references in one place

### Knowledge Organization

- Tag and categorize saved content

- Structured approach to managing information

### Second Brain Concept

- Acts as a personal knowledge repository

- Helps users retain and revisit important ideas

### Sync & Persistence

- Data stored securely in the database

- Accessible across sessions

### Performance & Scalability

- Built with modern, scalable web technologies

- Designed for fast content access

## Tech Stack

### Frontend

- React

- Tailwind CSS

### Backend

- Node.js

- Express.js

- TypeScript

### Database

- MongoDB

### Integrations

- Twitter API

- YouTube API

- Google Docs API

### Deployment

- Vercel

- Railway

- Docker

## Future Scope

- Advanced search and filtering

- AI-based content summarization

- Browser extension for one-click saves

- Improved tagging recommendations

- Collaboration and shared knowledge spaces

- Role-based access and permissions

## Quick Start

### Clone the repository

```
git clone https://github.com/rishabhdamle/Alzheimer.git
cd Alzheimer
```

### Backend Setup

```
cd backend
npm install

```

Create backend/.env:

```
DB_URL=
JWT_SECRET=
PORT=
FRONTEND_URL=

```

Run backend:

```
npm run dev

```

Frontend Setup

```
cd ../frontend
npm install

```

Create frontend/.env:

```
VITE_BACKEND_URL=http://localhost:3000

```

Run frontend:

```
npm run dev

```
