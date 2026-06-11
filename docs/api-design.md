# 📡 CineVerse — REST API Design

This document specifies the REST API endpoints for CineVerse. When accessed through the future gateway, endpoints are prefixed with `/api`. During Day 03 local development, the Auth Service can be called directly at `http://localhost:3001`.

---

## Base URL

```
Gateway     : http://localhost:4000/api
Auth direct : http://localhost:3001
Production  : https://api.cineverse.app/api
```

## Authentication

Protected endpoints require a valid JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## 1. Authentication Service (`/auth`)

### 1.1 Register a New User

```
POST /auth/register
```

Creates a new user account and returns a JWT.

**Request Body**

| Field      | Type   | Required | Description                  |
| ---------- | ------ | -------- | ---------------------------- |
| `name`     | string | ✅       | Display name (2-60 chars)    |
| `email`    | string | ✅       | Valid email address           |
| `password` | string | ✅       | Minimum 6 characters          |
| `role`     | string | No       | `USER`, `THEATRE_OWNER`, or `ADMIN`; defaults to `USER` |

**Example Request**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secureP@ss123",
  "role": "USER"
}
```

**Success Response — `201 Created`**

```json
{
  "success": true,
  "message": "User registered successfully",
  "status": 201,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "createdAt": "2026-06-10T10:00:00Z"
    }
  },
  "timestamp": "2026-06-10T10:00:00Z"
}
```

**Error Responses**

| Status | Reason                        |
| ------ | ----------------------------- |
| `400`  | Validation error              |
| `409`  | Username or email already exists |

---

### 1.2 Login

```
POST /auth/login
```

Authenticates a user and returns a JWT.

**Request Body**

| Field      | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| `email`    | string | ✅       | Registered email address |
| `password` | string | ✅       | Account password          |

**Example Request**

```json
{
  "email": "john@example.com",
  "password": "secureP@ss123"
}
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "message": "Login successful",
  "status": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "createdAt": "2026-06-10T10:00:00Z"
    }
  },
  "timestamp": "2026-06-10T10:00:00Z"
}
```

**Error Responses**

| Status | Reason                   |
| ------ | ------------------------ |
| `400`  | Missing required fields  |
| `401`  | Invalid credentials      |

### 1.3 Current User

```
GET /auth/me
```

Returns the authenticated user from the JWT. Requires `Authorization: Bearer <token>`.

### 1.4 Logout

```
GET /auth/logout
```

JWT auth is stateless, so the server confirms logout and the client removes its stored token.

### 1.5 RBAC Example Endpoints

| Endpoint | Role |
| -------- | ---- |
| `GET /auth/admin/users` | `ADMIN` |
| `GET /auth/theatre-owner/dashboard` | `THEATRE_OWNER` or `ADMIN` |

---

## 2. Movie Service (`/movies`)

### 2.1 List All Movies

```
GET /movies
```

Returns a paginated list of movies. **Public endpoint** — no authentication required.

**Query Parameters**

| Parameter | Type   | Default | Description                    |
| --------- | ------ | ------- | ------------------------------ |
| `page`    | number | `1`     | Page number                     |
| `limit`   | number | `10`    | Results per page (max 50)       |
| `genre`   | string | —       | Filter by genre                 |
| `search`  | string | —       | Search by title (case-insensitive) |

**Example Request**

```
GET /movies?page=1&limit=5&genre=Sci-Fi
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "data": {
    "movies": [
      {
        "id": "m001",
        "title": "Interstellar",
        "genre": "Sci-Fi",
        "year": 2014,
        "rating": 8.6,
        "director": "Christopher Nolan",
        "poster": "https://image.tmdb.org/...",
        "synopsis": "A team of explorers travel through a wormhole..."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 5,
      "total": 23,
      "totalPages": 5
    }
  }
}
```

---

### 2.2 Get Movie by ID

```
GET /movies/{id}
```

Returns detailed information about a single movie. **Public endpoint**.

**Path Parameters**

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| `id`      | string | Unique movie ID    |

**Example Request**

```
GET /movies/m001
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "data": {
    "id": "m001",
    "title": "Interstellar",
    "genre": "Sci-Fi",
    "year": 2014,
    "rating": 8.6,
    "director": "Christopher Nolan",
    "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    "duration": 169,
    "poster": "https://image.tmdb.org/...",
    "synopsis": "A team of explorers travel through a wormhole in space..."
  }
}
```

**Error Responses**

| Status | Reason          |
| ------ | --------------- |
| `404`  | Movie not found |

---

## 3. Review Service (`/reviews`)

### 3.1 Post a Review

```
POST /reviews
```

Creates a new review for a movie. **🔒 Requires authentication**.

**Request Body**

| Field     | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| `movieId` | string | ✅       | ID of the movie being reviewed     |
| `rating`  | number | ✅       | Rating from 1 to 10                |
| `comment` | string | ✅       | Review text (10-1000 characters)   |

**Example Request**

```json
{
  "movieId": "m001",
  "rating": 9,
  "comment": "A masterpiece of science fiction cinema. The visuals and score are breathtaking."
}
```

**Success Response — `201 Created`**

```json
{
  "success": true,
  "data": {
    "id": "r001",
    "movieId": "m001",
    "userId": "648a1f...",
    "username": "johndoe",
    "rating": 9,
    "comment": "A masterpiece of science fiction cinema...",
    "createdAt": "2026-06-10T10:15:00Z"
  }
}
```

**Error Responses**

| Status | Reason                              |
| ------ | ----------------------------------- |
| `400`  | Validation error                    |
| `401`  | Missing or invalid token            |
| `404`  | Movie not found                     |
| `409`  | User has already reviewed this movie |

---

### 3.2 Get Reviews for a Movie

```
GET /reviews/{movieId}
```

Returns all reviews for a specific movie. **Public endpoint**.

**Path Parameters**

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| `movieId` | string | Unique movie ID    |

**Example Request**

```
GET /reviews/m001
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "data": {
    "movieId": "m001",
    "movieTitle": "Interstellar",
    "averageRating": 8.7,
    "totalReviews": 3,
    "reviews": [
      {
        "id": "r001",
        "userId": "648a1f...",
        "username": "johndoe",
        "rating": 9,
        "comment": "A masterpiece of science fiction cinema...",
        "createdAt": "2026-06-10T10:15:00Z"
      },
      {
        "id": "r002",
        "userId": "749b2g...",
        "username": "janedoe",
        "rating": 8,
        "comment": "Visually stunning but the pacing drags...",
        "createdAt": "2026-06-10T11:30:00Z"
      }
    ]
  }
}
```

**Error Responses**

| Status | Reason          |
| ------ | --------------- |
| `404`  | Movie not found |

---

## 4. REST API — Design Principles

### What is REST?

**REST (Representational State Transfer)** is an architectural style for designing networked applications. RESTful APIs use HTTP methods to perform CRUD operations on resources identified by URIs.

### HTTP Methods Used

| Method | Purpose | Idempotent | Safe |
| ------ | ------- | ---------- | ---- |
| `GET`  | Read / retrieve a resource    | ✅ | ✅ |
| `POST` | Create a new resource          | ❌ | ❌ |
| `PUT`  | Replace / update a resource    | ✅ | ❌ |
| `DELETE` | Remove a resource            | ✅ | ❌ |

### Design Decisions

1. **Resource-oriented URLs** — Endpoints represent nouns (`/movies`, `/reviews`), not verbs.
2. **Consistent response envelope** — Every response wraps data in `{ success, data }` for predictable client-side parsing.
3. **Proper HTTP status codes** — `201` for creation, `400` for validation errors, `401` for authentication failures, `404` for missing resources, `409` for conflicts.
4. **Pagination** — List endpoints accept `page` and `limit` query parameters to prevent unbounded result sets.
5. **Stateless authentication** — JWT tokens are sent per-request; the server holds no session state.
6. **Versioning (future)** — The API will be versioned via URL prefix (`/api/v1/`) when breaking changes are introduced.
