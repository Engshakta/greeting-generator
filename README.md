# Hello World Full-Stack Application
A full-stack training project featuring a "Hello World" API built with Node.js and Express, seamlessly integrated with a React frontend powered by Vite. This project demonstrates foundational full-stack development skills, including backend API creation, frontend-backend communication, and modern tooling.

## Project Overview
This application consists of two main components:
- **Backend**: A Node.js server using Express to serve a simple "Hello World" message via a GET endpoint at `http://localhost:5000`.
- **Frontend**: A React application built with Vite, fetching and displaying the backend's response at `http://localhost:5173`.
Created as part of a full-stack development training initiative with Sometech, this project showcases the integration of modern JavaScript technologies.

## Tech Stack
- **Backend**: Node.js, Express, CORS
- **Frontend**: React, Vite
- **Version Control**: Git, GitHub
- **Development Tools**: VS Code, PowerShell

## Prerequisites
- **Node.js**: v22.12.0 or higher
- **npm**: Latest version (check with `npm -v`)
- **Git**: Installed for version control (check with `git --version`)

## Setup Instructions
### Clone the Repository
```bash
git clone https://github.com/Engshakta/hw-endpoint.git
cd hw-endpoint
Backend Setup

cd backend
npm install
node server.js

Frontend Setup

cd frontend
npm install
npm run dev
Verify
Backend: Visit http://localhost:5000 (shows "Hello World").
Frontend: Visit http://localhost:5173 (displays "Message from API: Hello World").

Author
Abdishakur (GitHub: Engshakta)
