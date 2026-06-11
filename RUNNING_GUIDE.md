# 🎬 CineVerse Day 03 - Complete Running Guide

## Quick Start (Copy & Paste)

### Terminal 1: Start Backend
```bash
cd /Users/garvitmadaan/.gemini/antigravity-ide/scratch/CineVerse
java -jar backend/auth-service/target/auth-service-0.0.1-SNAPSHOT.jar
```

### Terminal 2: Start Frontend
```bash
export PATH="/tmp/node-v22.12.0-darwin-arm64/bin:$PATH"
cd /Users/garvitmadaan/.gemini/antigravity-ide/scratch/CineVerse/frontend
npm run dev
```

### Terminal 3: Test APIs
```bash
# Register a user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "JohnPass123!",
    "role": "USER"
  }'

# Login and get token
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "JohnPass123!"
  }'
```

---

## 📊 What Each Day 03 Task Does

### ✅ Task 1: Spring Boot Auth Service Backend

**Location**: `/backend/auth-service/`

**What it provides**:
- ✓ User registration endpoint
- ✓ User login endpoint with JWT generation
- ✓ Protected endpoints requiring JWT token
- ✓ Password hashing with BCrypt
- ✓ Role-based access control (USER, ADMIN)
- ✓ Centralized error handling

**Files**:
```
backend/auth-service/
├── src/main/java/com/cineverse/auth/
│   ├── AuthServiceApplication.java          (Spring Boot entry point)
│   ├── controller/AuthController.java        (HTTP endpoints)
│   ├── service/AuthService.java              (Business logic)
│   ├── repository/UserRepository.java        (Database queries)
│   ├── entity/User.java                      (Database mapping)
│   ├── dto/                                  (Request/Response objects)
│   ├── security/                             (JWT & Auth filters)
│   └── config/SecurityConfig.java            (Spring Security setup)
├── pom.xml                                   (Maven dependencies)
└── application.properties                    (H2 database config)
```

**Key Technologies**:
- Spring Boot 3.5
- Spring Security
- JWT (JJWT)
- JPA/Hibernate
- H2 Database (In-memory)
- BCrypt Password Hashing

---

### ✅ Task 2: React Frontend Integration

**Location**: `/frontend/`

**What it provides**:
- ✓ Registration form component
- ✓ Login form component
- ✓ Protected routes (only authenticated users)
- ✓ Auth context for state management
- ✓ JWT token storage in localStorage
- ✓ Navbar with user info display

**Key Components**:
```
frontend/src/
├── pages/
│   ├── Register.jsx          (Registration form)
│   ├── Login.jsx             (Login form)
│   ├── Dashboard.jsx         (Home page - protected)
│   ├── Movies.jsx            (Movie browse - protected)
│   └── Reviews.jsx           (Reviews - protected)
├── components/
│   ├── ProtectedRoute.jsx    (Route guard)
│   ├── Navbar.jsx            (Top navigation)
│   └── MovieCard.jsx         (Movie display)
├── context/
│   └── AuthContext.jsx       (Auth state management)
├── services/
│   └── api.js                (API calls with axios)
└── App.jsx                   (Main app component)
```

**Features**:
- JWT token auto-stored in localStorage
- Auto-login on page reload
- Automatic logout after 24 hours
- Protected routes redirect to login
- User role display (USER/ADMIN)

---

### ✅ Task 3: JWT Authentication System

**How it works**:

1. **User Registration**
   ```
   POST /api/auth/register
   { name, email, password, role }
   ↓
   Backend hashes password with BCrypt
   ↓
   Saves to H2 database
   ↓
   Returns UserResponse (no token yet)
   ```

2. **User Login**
   ```
   POST /api/auth/login
   { email, password }
   ↓
   Backend verifies credentials
   ↓
   Generates JWT token containing:
     - userId
     - email
     - role
     - expiration (24 hours)
   ↓
   Returns AuthResponse with token
   ```

3. **API Requests with JWT**
   ```
   GET /api/auth/profile
   Header: Authorization: Bearer <jwt_token>
   ↓
   Backend validates token signature
   ↓
   Checks expiration
   ↓
   Extracts user info from token
   ↓
   Returns protected data
   ```

**Token Structure**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiI0IiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2MjMwNDAwMDB9.
G4HjNuBzUJsQZ6X5Q3z3c9K2F1x8V7w6Y9a2b3c4d5e

Header   │ Payload (user data)      │ Signature (proof)
```

---

### ✅ Task 4: Password Security (BCrypt)

**How it protects**:

1. **On Registration**
   ```
   User enters: "JohnPass123!"
   ↓
   BCrypt hashes it: $2a$12$abcdef123456789xyz...
   ↓
   Database stores: $2a$12$abcdef123456789xyz...
   ↓
   Original password is NEVER stored
   ```

2. **On Login**
   ```
   User enters: "JohnPass123!"
   ↓
   BCrypt hashes it with stored salt
   ↓
   Compare hashes
   ↓
   Match = Login successful
   ```

**Benefits**:
- ✓ One-way encryption (cannot reverse)
- ✓ Unique hash per user (salt added)
- ✓ Slow computation (prevents brute-force)
- ✓ Even if DB compromised, passwords safe

---

### ✅ Task 5: Role-Based Access Control (RBAC)

**User Roles**:

| Role | Permissions | Access |
|------|------------|--------|
| USER | Read movies, Create reviews, Update own reviews | Regular features |
| ADMIN | All USER permissions + Manage users, Delete reviews | Admin dashboard |

**Example**:

```java
// USER can:
GET /api/movies                    ✓
POST /api/reviews                  ✓
GET /api/reviews/own               ✓

// ADMIN can:
GET /api/admin/users               ✓
DELETE /api/reviews/{id}           ✓
PUT /api/users/{id}                ✓
```

---

### ✅ Task 6: H2 In-Memory Database

**What it is**:
- Lightweight database that runs in RAM
- Auto-creates schema on startup
- Resets when server restarts
- Perfect for development/testing
- No PostgreSQL needed

**Location**: `/backend/auth-service/src/main/resources/application.properties`

**Configuration**:
```properties
spring.datasource.url=jdbc:h2:mem:cineverse_auth
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
```

**Access H2 Console**:
1. Backend running on http://localhost:3001
2. Go to: http://localhost:3001/h2-console
3. Connection settings (pre-filled):
   - URL: `jdbc:h2:mem:cineverse_auth`
   - Username: `sa`
   - Password: (leave empty)
4. Click "Connect"
5. Browse `USER_T` table to see registered users

**Query Example**:
```sql
-- See all users
SELECT * FROM USER_T;

-- See specific user
SELECT * FROM USER_T WHERE EMAIL = 'john@example.com';

-- Count users
SELECT COUNT(*) FROM USER_T;
```

---

### ✅ Task 7: Layered Architecture

**Architecture Layers**:

```
┌─────────────────────────────────────────┐
│         HTTP Requests                    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  Controller Layer (AuthController)      │
│  - Receive HTTP requests                │
│  - Validate format                      │
│  - Return HTTP responses                │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  Service Layer (AuthService)            │
│  - Business logic                       │
│  - Password hashing                     │
│  - JWT generation                       │
│  - Validation rules                     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  Repository Layer (UserRepository)      │
│  - Database queries                     │
│  - Save/retrieve users                  │
│  - Find by email                        │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         H2 Database                      │
│  - Stores encrypted passwords           │
│  - User roles                           │
│  - Timestamps                           │
└──────────────────────────────────────────┘
```

**Benefits**:
- ✓ Single Responsibility
- ✓ Easy to test
- ✓ Easy to maintain
- ✓ Easy to extend

---

## 🧪 Complete Testing Workflow

### Step 1: Start All Servers

**Terminal 1 - Backend**:
```bash
cd /Users/garvitmadaan/.gemini/antigravity-ide/scratch/CineVerse
java -jar backend/auth-service/target/auth-service-0.0.1-SNAPSHOT.jar
```

Wait for:
```
Tomcat started on port 3001 (http) with context path '/'
Started AuthServiceApplication
```

**Terminal 2 - Frontend**:
```bash
export PATH="/tmp/node-v22.12.0-darwin-arm64/bin:$PATH"
cd /Users/garvitmadaan/.gemini/antigravity-ide/scratch/CineVerse/frontend
npm run dev
```

Wait for:
```
VITE v8.0.16  ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

### Step 2: Test Registration (API)

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "AlicePass123!",
    "role": "USER"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "USER"
  }
}
```

---

### Step 3: Test Login & Get Token (API)

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "AlicePass123!"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "role": "USER"
    }
  }
}
```

**Save the token** for next step.

---

### Step 4: Test Protected Endpoint (API)

```bash
# Replace with actual token from Step 3
BEARER_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer $BEARER_TOKEN"
```

**Expected Response**:
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "USER"
  }
}
```

---

### Step 5: Test Invalid Token Rejection (API)

```bash
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer invalid_token_xyz"
```

**Expected Response**:
```json
{
  "success": false,
  "message": "Invalid or expired JWT token"
}
```

---

### Step 6: Test Registration Via UI

1. Open http://localhost:5173 in browser
2. Click **"Don't have an account? Register"**
3. Fill form:
   - Name: `Bob Smith`
   - Email: `bob@example.com`
   - Password: `BobPass123!`
4. Click **"Register"**
5. Should redirect to login

---

### Step 7: Test Login Via UI

1. Fill login form:
   - Email: `bob@example.com`
   - Password: `BobPass123!`
2. Click **"Login"**
3. Should see Dashboard with user info
4. Check browser DevTools → Application → localStorage
5. Should see `authToken` and `user` stored

---

### Step 8: Test Protected Routes

1. Try to access `/movies` directly - should redirect to login
2. Login first, then access `/movies` - should show movies page
3. Click Logout - should clear token and redirect to login

---

### Step 9: Check Database

1. Go to http://localhost:3001/h2-console
2. Run query:
   ```sql
   SELECT * FROM USER_T;
   ```
3. See registered users with hashed passwords

---

### Step 10: Test Admin Role

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Super Admin",
    "email": "admin@example.com",
    "password": "AdminPass123!",
    "role": "ADMIN"
  }'
```

Login with admin account:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "AdminPass123!"
  }'
```

Response will show:
```json
"role": "ADMIN"
```

---

## 📈 Files Modified/Created in Day 03

### Backend Changes:
- ✓ `backend/auth-service/pom.xml` - Added H2 dependency
- ✓ `backend/auth-service/src/main/resources/application.properties` - H2 config
- ✓ `backend/auth-service/src/main/java/com/cineverse/auth/` - Complete auth service

### Frontend Changes:
- ✓ `frontend/src/context/AuthContext.jsx` - Auth state management
- ✓ `frontend/src/pages/Register.jsx` - Registration page
- ✓ `frontend/src/pages/Login.jsx` - Login page
- ✓ `frontend/src/components/ProtectedRoute.jsx` - Route protection
- ✓ `frontend/src/services/api.js` - API client with JWT
- ✓ `frontend/src/App.jsx` - Updated routing

### Documentation:
- ✓ `README.md` - Updated with new tech stack
- ✓ `DAY_03_USAGE_GUIDE.md` - This comprehensive guide

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Kill any existing process
pkill -f "java.*auth-service"

# Start fresh
java -jar backend/auth-service/target/auth-service-0.0.1-SNAPSHOT.jar
```

### Port 3001 already in use
```bash
# Find process using port
lsof -i :3001

# Kill it
kill -9 <PID>
```

### Frontend can't connect to backend
- Check backend is running on 3001
- Check CORS is enabled (it is by default)
- Check frontend API URL in `services/api.js`

### Token issues
- Tokens expire after 24 hours
- Tokens are validated on every request
- Invalid tokens return 403 error
- Clear localStorage and re-login to get fresh token

### Database data lost
- H2 in-memory database resets on server restart
- This is normal for development
- For production, switch to PostgreSQL

---

## ✨ Summary

**Day 03 delivered**:

✅ **Backend** - Spring Boot auth service with JWT, BCrypt, RBAC
✅ **Frontend** - React UI with registration, login, protected routes
✅ **Database** - H2 in-memory with auto-schema generation
✅ **Architecture** - Layered design (Controller → Service → Repository)
✅ **Security** - Password hashing, JWT validation, role-based access
✅ **Testing** - Complete testing workflow and demo scripts

**All working end-to-end!** 🚀

