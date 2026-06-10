# 🏗 CineVerse — System Architecture

## 1. High-Level Architecture

CineVerse follows a **microservices architecture** with a React single-page application (SPA) on the frontend. All client requests flow through an **API Gateway** that handles routing, authentication verification, and rate limiting before forwarding them to the appropriate backend service.

```
┌──────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                        │
│                        React SPA (Vite)                         │
└──────────────────────┬───────────────────────────────────────────┘
                       │  HTTPS
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                        API Gateway                               │
│              (Express.js — Routing & Auth Middleware)             │
└────────┬──────────────────┬──────────────────┬───────────────────┘
         │                  │                  │
         ▼                  ▼                  ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│  Auth Service  │ │ Movie Service  │ │ Review Service │
│  (Port 3001)   │ │  (Port 3002)   │ │  (Port 3003)   │
└───────┬────────┘ └───────┬────────┘ └───────┬────────┘
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                     MongoDB (Database Layer)                     │
│         users          │       movies       │      reviews       │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Request Flow

### Frontend → API Gateway → Microservices → Database

1. **User Interaction** — The user interacts with the React SPA (e.g., clicks "Browse Movies").
2. **API Call** — The frontend's Axios service layer sends an HTTP request to the API Gateway with the JWT token in the `Authorization` header.
3. **Gateway Routing** — The API Gateway:
   - Validates the JWT token (for protected routes).
   - Determines the target microservice based on the request path prefix (`/auth/*`, `/movies/*`, `/reviews/*`).
   - Proxies the request to the appropriate microservice.
4. **Service Processing** — The target microservice processes the business logic:
   - Validates the request payload.
   - Queries or mutates the database.
   - Returns a structured JSON response.
5. **Response** — The response travels back through the Gateway to the frontend, which updates the UI reactively.

### Example: Fetching Movies

```
Browser → GET /api/movies
       → API Gateway (validates token, routes to Movie Service)
       → Movie Service (queries MongoDB `movies` collection)
       → Returns JSON array of movies
       → API Gateway (forwards response)
       → Browser (renders MovieCard components)
```

---

## 3. Microservices Breakdown

### 3.1 Auth Service (`backend/auth-service/`)

| Concern         | Detail                                      |
| --------------- | ------------------------------------------- |
| **Purpose**     | User registration, login, token management  |
| **Port**        | 3001                                        |
| **Database**    | MongoDB — `users` collection                |
| **Key Endpoints** | `POST /auth/register`, `POST /auth/login` |
| **Security**    | Passwords hashed with bcrypt; JWTs signed with RS256 |

### 3.2 Movie Service (`backend/movie-service/`)

| Concern         | Detail                                      |
| --------------- | ------------------------------------------- |
| **Purpose**     | CRUD operations on the movie catalogue      |
| **Port**        | 3002                                        |
| **Database**    | MongoDB — `movies` collection               |
| **Key Endpoints** | `GET /movies`, `GET /movies/:id`          |
| **Access**      | Read operations are public; write operations require admin role |

### 3.3 Review Service (`backend/review-service/`)

| Concern         | Detail                                      |
| --------------- | ------------------------------------------- |
| **Purpose**     | Movie reviews and ratings                   |
| **Port**        | 3003                                        |
| **Database**    | MongoDB — `reviews` collection              |
| **Key Endpoints** | `POST /reviews`, `GET /reviews/:movieId`  |
| **Access**      | Reading reviews is public; posting requires authentication |

---

## 4. Technology Selection Justification

### Frontend — React + Vite

- **React** is the industry-standard library for building component-driven UIs. Its virtual DOM, unidirectional data flow, and massive ecosystem make it ideal for SPAs.
- **Vite** provides near-instant hot module replacement (HMR) and a lightning-fast dev server compared to Create React App or Webpack, dramatically improving developer experience.

### API Gateway — Express.js

- Lightweight, flexible, and well-understood.
- Acts as a reverse proxy, centralising cross-cutting concerns (authentication, logging, rate limiting) so individual services remain focused on business logic.

### Backend — Node.js / Express

- JavaScript across the entire stack reduces cognitive overhead and allows code sharing (e.g., validation schemas).
- Non-blocking I/O model is well-suited for the I/O-heavy workload of an API server.
- Each microservice runs as an independent Express application, enabling independent deployment and scaling.

### Database — MongoDB

- Document-oriented storage maps naturally to the JSON payloads used across the stack.
- Flexible schemas accelerate iteration during early development.
- Horizontal scaling via sharding supports future growth.

### Authentication — JWT (JSON Web Tokens)

- Stateless authentication eliminates server-side session storage, simplifying horizontal scaling.
- Tokens are self-contained, carrying user identity and roles, reducing database lookups on every request.

### HTTP Client — Axios

- Promise-based API with automatic JSON parsing.
- Interceptors enable centralised attachment of auth headers and global error handling.
- Consistent API across browser and Node.js environments.

---

## 5. Deployment Strategy (Future)

```
┌──────────┐      ┌──────────────┐      ┌───────────────┐
│  Docker   │ ───▶ │  Docker      │ ───▶ │   Kubernetes  │
│  Compose  │      │  Registry    │      │   / Cloud Run │
│  (local)  │      │  (CI/CD)     │      │   (production)│
└──────────┘      └──────────────┘      └───────────────┘
```

Each microservice will be containerised with its own `Dockerfile`, and `docker-compose.yml` will orchestrate the full stack for local development.
