# 🎬 CineVerse Day 03 - Quick Visual Summary

## What We Built Today

```
┌─────────────────────────────────────────────────────────────┐
│                    CineVerse Platform                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐          ┌──────────────────┐          │
│  │   React App      │          │  Spring Boot     │          │
│  │   (Frontend)     │◄────────►│   (Backend)      │          │
│  │  Port 5173       │ HTTP+JWT │  Port 3001       │          │
│  └──────────────────┘          └────────┬─────────┘          │
│       │                                  │                    │
│       │ localStorage                     │ JPA/Hibernate     │
│       │ (JWT Token)                      │                    │
│       │                                  ▼                    │
│       │                         ┌──────────────────┐          │
│       │                         │  H2 Database     │          │
│       │                         │  In-Memory       │          │
│       └────────────────────────►│  (Users)         │          │
│                                 └──────────────────┘          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Day 03 Tasks Implemented

### 1️⃣ User Registration
```
User fills form with:
  - Name
  - Email
  - Password
  - Role (USER/ADMIN)
      ↓
  Backend validates
      ↓
  Password hashed with BCrypt
      ↓
  Saved to H2 database
      ↓
  ✓ Account created
```

### 2️⃣ User Login
```
User enters email & password
      ↓
  Backend verifies credentials
      ↓
  Password matches hash?
      ↓
  YES → Generate JWT token
      ↓
  Token contains:
    - User ID
    - Email
    - Role
    - Expires in 24h
      ↓
  ✓ Token returned to frontend
```

### 3️⃣ JWT Token Storage
```
Frontend receives token
      ↓
  Save to localStorage
  (survives page refresh)
      ↓
  Include in every request:
  Authorization: Bearer <token>
      ↓
  Backend validates signature
      ↓
  ✓ Request allowed
```

### 4️⃣ Protected Routes
```
User tries to access /movies
      ↓
  Check if token in localStorage
      ↓
  NO token? → Redirect to /login
      ↓
  YES token? → Show page
```

### 5️⃣ Password Security
```
User password: "JohnPass123!"
      ↓
  BCrypt hashing
      ↓
  Stored as: $2a$12$N9qo8uLO...
  (one-way encryption)
      ↓
  Even if DB stolen:
  ✓ Cannot reverse to get password
```

### 6️⃣ Role-Based Access Control
```
USER Role:
  ✓ Register, Login
  ✓ Browse movies
  ✓ Write reviews
  
ADMIN Role:
  ✓ All USER permissions
  ✓ Manage users
  ✓ Delete reviews
  ✓ Access admin dashboard
```

### 7️⃣ Layered Architecture
```
API Request
    ↓
┌─────────────────────┐
│ Controller Layer    │ ← Receive HTTP
└─────────────────────┘
    ↓
┌─────────────────────┐
│ Service Layer       │ ← Business Logic
└─────────────────────┘
    ↓
┌─────────────────────┐
│ Repository Layer    │ ← Database Queries
└─────────────────────┘
    ↓
┌─────────────────────┐
│ H2 Database         │ ← Store Data
└─────────────────────┘
    ↓
Response sent back
```

---

## 📊 API Endpoints

### Public Endpoints (No token needed)

```
POST /api/auth/register
├─ Request:  { name, email, password, role }
└─ Response: { success, user_data }

POST /api/auth/login
├─ Request:  { email, password }
└─ Response: { success, token, user_data }
```

### Protected Endpoints (Token required)

```
GET /api/auth/profile
├─ Header:   Authorization: Bearer <token>
└─ Response: { success, user_data }

POST /api/auth/logout
├─ Header:   Authorization: Bearer <token>
└─ Response: { success, message }
```

---

## 🚀 How to Use It

### Start Backend
```bash
java -jar backend/auth-service/target/auth-service-0.0.1-SNAPSHOT.jar
# Running on http://localhost:3001
```

### Start Frontend
```bash
cd frontend
export PATH="/tmp/node-v22.12.0-darwin-arm64/bin:$PATH"
npm run dev
# Running on http://localhost:5173
```

### Test via API
```bash
# 1. Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"John123!","role":"USER"}'

# 2. Login (get token)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"John123!"}'

# 3. Use token to access protected endpoint
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer <TOKEN_FROM_STEP_2>"
```

### Test via Browser
1. Go to http://localhost:5173
2. Click "Register" → Fill form → Submit
3. Click "Login" → Use registered email → Submit
4. See Dashboard (protected page)
5. Navigate to Movies (protected page)
6. Click Logout

---

## 🔐 Security Features

| Feature | Implementation | Benefit |
|---------|----------------|---------|
| **Password Hashing** | BCrypt (cost 12) | Can't reverse hash to get password |
| **JWT Tokens** | JJWT library | Stateless, scalable authentication |
| **Token Expiration** | 24 hours | Limits token misuse window |
| **Role-Based Access** | RBAC annotations | Different users, different permissions |
| **CORS Enabled** | Spring Security | Frontend can call backend safely |
| **HTTPS Ready** | Spring Boot | Can enable SSL in production |

---

## 📁 Project Structure

```
CineVerse/
│
├── frontend/                      (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx      ← Registration form
│   │   │   ├── Login.jsx         ← Login form  
│   │   │   └── Dashboard.jsx     ← Protected home
│   │   ├── context/
│   │   │   └── AuthContext.jsx   ← State management
│   │   ├── services/
│   │   │   └── api.js            ← API client
│   │   └── App.jsx               ← Main app
│   └── package.json
│
├── backend/
│   └── auth-service/             (Spring Boot)
│       ├── src/main/java/com/cineverse/auth/
│       │   ├── controller/       ← HTTP endpoints
│       │   ├── service/          ← Business logic
│       │   ├── repository/       ← Database access
│       │   ├── entity/           ← JPA entities
│       │   ├── dto/              ← Request/Response
│       │   ├── security/         ← JWT & Auth
│       │   └── config/           ← Spring config
│       ├── pom.xml               ← Maven config
│       └── application.properties ← H2 database
│
├── DAY_03_USAGE_GUIDE.md         ← Detailed guide
├── RUNNING_GUIDE.md              ← How to run
└── README.md                      ← Project overview
```

---

## ✅ Verification Checklist

- [x] Backend starts on port 3001
- [x] Frontend starts on port 5173
- [x] Registration endpoint works (POST /api/auth/register)
- [x] Login endpoint works (POST /api/auth/login)
- [x] JWT token generated on login
- [x] Protected endpoint requires token
- [x] Invalid token rejected
- [x] Frontend can register users
- [x] Frontend can login users
- [x] Frontend stores token in localStorage
- [x] Protected routes work (redirect to login if not authenticated)
- [x] User info displayed after login
- [x] Logout clears token
- [x] H2 database stores users
- [x] BCrypt hashes passwords
- [x] Admin role works
- [x] Layered architecture implemented

---

## 🎯 What Each Technology Does

| Tech | What it does | Why we use it |
|------|-------------|---------------|
| **Spring Boot** | Web framework for Java | Fast, scalable backend |
| **JWT** | Token-based authentication | Stateless auth (no sessions) |
| **BCrypt** | Password hashing | Secure password storage |
| **H2** | In-memory database | Easy development (no PostgreSQL) |
| **React** | UI library | Interactive user interface |
| **Axios** | HTTP client | Call backend from frontend |
| **localStorage** | Browser storage | Remember token after page refresh |

---

## 📈 Next Steps (Day 04+)

With auth working, we can now build:

1. **Movie Service** - Browse movies
2. **Review Service** - Post reviews
3. **API Gateway** - Route to all services
4. **Search** - Find movies/reviews
5. **Watchlist** - Save favorite movies
6. **Admin Dashboard** - Manage content
7. **Production Database** - Switch to PostgreSQL

---

## 🎓 Learning Outcomes

✅ **Spring Boot Backend** - Microservices architecture
✅ **JWT Security** - Token-based authentication
✅ **React Frontend** - State management & routing
✅ **Database Design** - Entity relationships
✅ **API Design** - RESTful endpoints
✅ **Security Best Practices** - Password hashing, token validation
✅ **Layered Architecture** - Clean code organization

---

## 🔗 Important Links

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **H2 Console**: http://localhost:3001/h2-console
- **GitHub**: https://github.com/Garvit3001/cinverse-movie-project

---

**Day 03 Complete! 🚀**

All authentication features working end-to-end with secure JWT tokens, password hashing, and role-based access control!

