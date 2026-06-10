# 🎬 CineVerse

> A modern movie discovery and management platform inspired by Netflix & IMDb — built with a microservices architecture.

---

## 📖 Project Overview

CineVerse is a full-stack movie discovery platform that allows users to browse movies, read and write reviews, and manage their watchlists. The application is built with a React frontend communicating through an API Gateway to a set of independent microservices, each responsible for a single domain of the business logic.

---

## ✨ Features

- **User Authentication** — Register and log in with secure JWT-based authentication.
- **Movie Discovery** — Browse a curated catalogue of movies with rich metadata (genre, rating, synopsis, poster art).
- **Reviews & Ratings** — Post reviews and rate movies; read what other users think.
- **Protected Routes** — Unauthenticated users are seamlessly redirected to the login page.
- **Responsive UI** — A premium, mobile-first interface with smooth animations and modern design.
- **API Gateway** — A single entry-point that routes requests to the correct microservice.

---

## 🛠 Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Frontend     | React 18, Vite, React Router v6     |
| HTTP Client  | Axios                               |
| Auth         | JWT (simulated on the client)       |
| Backend      | Node.js / Express *(planned)*       |
| Gateway      | Express API Gateway *(planned)*     |
| Database     | MongoDB *(planned)*                 |
| Styling      | Vanilla CSS with custom properties  |

---

## 📁 Folder Structure

```
CineVerse/
├── frontend/                   # React + Vite application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/              # Route-level page components
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Movies.jsx
│   │   │   └── Reviews.jsx
│   │   ├── routes/             # Route configuration
│   │   ├── services/           # API service layer (Axios)
│   │   │   └── api.js
│   │   ├── context/            # React Context providers
│   │   ├── utils/              # Helper functions
│   │   └── App.jsx             # Root application component
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── auth-service/           # Authentication microservice
│   ├── movie-service/          # Movie catalogue microservice
│   └── review-service/         # Review & ratings microservice
├── gateway/                    # API Gateway
├── docs/
│   ├── architecture.md         # System architecture documentation
│   └── api-design.md           # REST API specification
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📄 Documentation

- [Architecture Overview](docs/architecture.md)
- [API Design Specification](docs/api-design.md)

---

## 📜 License

This project is licensed under the MIT License.
