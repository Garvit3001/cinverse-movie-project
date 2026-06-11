# 🎬 CineVerse Day 03 - Complete Usage Guide

## 📚 Overview of Day 03 Tasks

Today we implemented a **production-grade authentication system** for CineVerse using Spring Boot, JWT, and React. Here's what each task does and how to use it:

---

## 🔐 Task 1: Backend Authentication Service

### What It Does:
- **User Registration** → Creates new accounts with email & password
- **User Login** → Issues JWT tokens for authenticated sessions
- **JWT Validation** → Protects API endpoints
- **Role-Based Access Control** → Different user roles (USER, ADMIN)
- **Password Security** → BCrypt hashing (passwords are never stored in plain text)

### How to Use It:

#### 1.1 Register a New User

**Endpoint**: `POST /api/auth/register`

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "role": "USER"
  }'
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

#### 1.2 Login and Get JWT Token

**Endpoint**: `POST /api/auth/login`

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER"
    }
  }
}
```

#### 1.3 Use JWT Token to Access Protected Endpoints

Store the token from the login response, then use it in subsequent requests:

```bash
# Example: Get user profile (protected endpoint)
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## ⚛️ Task 2: Frontend Authentication Integration

### What It Does:
- **Registration Form** → Collects user details and sends to backend
- **Login Form** → Authenticates user and stores JWT token
- **Protected Routes** → Only authenticated users can access certain pages
- **Auth Context** → Shares user data across all components
- **Auto Redirect** → Redirects unauthenticated users to login

### How to Use It:

#### 2.1 Register a New Account (in UI)

1. Go to `http://localhost:5173`
2. Click **"Don't have an account? Register"**
3. Fill in the form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `SecurePass123!`
4. Click **"Register"**
5. You'll be redirected to login page

#### 2.2 Login (in UI)

1. On the login page, enter:
   - Email: `john@example.com`
   - Password: `SecurePass123!`
2. Click **"Login"**
3. Your JWT token is automatically saved to **localStorage**
4. You're redirected to the **Dashboard**

#### 2.3 View Your Profile

Once logged in, you'll see:
- Your name and email
- Your role (USER or ADMIN)
- A logout button

#### 2.4 Logout

Click **"Logout"** button in the top-right corner to:
- Clear the JWT token
- Clear localStorage
- Redirect to login page

---

## 🔑 Task 3: JWT Token System

### What It Does:
- **Token Generation** → Creates signed tokens on successful login
- **Token Storage** → Saves token in browser localStorage
- **Token Validation** → Verifies token on every API request
- **Token Expiration** → Tokens expire after 24 hours (configurable)
- **Stateless Authentication** → No session storage needed on backend

### How It Works (Behind the Scenes):

```
1. User logs in with email & password
   ↓
2. Backend validates credentials against bcrypt hash
   ↓
3. Backend generates JWT token containing:
   - User ID
   - User email
   - User role
   - Expiration time (24 hours)
   ↓
4. Token signed with secret key (kept safe on server)
   ↓
5. Token sent to frontend & stored in localStorage
   ↓
6. Every API request includes: Authorization: Bearer <token>
   ↓
7. Backend validates token signature & expiration
   ↓
8. Request allowed if valid, rejected if invalid/expired
```

### Token Example:

A JWT token has 3 parts separated by dots:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2MjMwNDAwMDB9.
G4HjNuBzUJsQZ6X5Q3z3c9K2F1x8V7w6Y9a2b3c4d5e
```

**Part 1 (Header)**: Algorithm info
**Part 2 (Payload)**: User data (encrypted but visible)
**Part 3 (Signature)**: Proof token wasn't tampered with

---

## 🛡️ Task 4: Role-Based Access Control (RBAC)

### What It Does:
- **USER Role** → Can browse movies, read reviews, create reviews
- **ADMIN Role** → Can manage users, moderate reviews, delete content
- **Authorization Checks** → Different endpoints check different roles

### How to Use It:

#### 4.1 Register with ADMIN Role (Admin Only)

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "AdminPass123!",
    "role": "ADMIN"
  }'
```

#### 4.2 Protected Admin Endpoints

Only users with `role=ADMIN` can access:

```bash
# Get all users (Admin only)
curl -X GET http://localhost:3001/api/admin/users \
  -H "Authorization: Bearer <admin_token>"
```

#### 4.3 Role Check in Frontend

The frontend automatically checks user role:

```javascript
// Example in a React component
if (user.role === 'ADMIN') {
  // Show admin dashboard
} else {
  // Show user dashboard
}
```

---

## 🔒 Task 5: Password Security with BCrypt

### What It Does:
- **Password Hashing** → Converts passwords to one-way encrypted strings
- **Salt** → Adds randomness to hashes for extra security
- **Bcrypt Cost** → Increases computation time to prevent brute-force attacks
- **No Plain Text Storage** → Database never stores actual passwords

### How It Works:

```
User enters: "SecurePass123!"
   ↓
Backend hashes with bcrypt (cost factor 12):
   ↓
Stored in database: $2a$12$abcdef123456789...
   ↓
Login attempt with "SecurePass123!"
   ↓
Hash new input & compare with stored hash
   ↓
Match = Login successful
```

### Security Benefits:

✅ Even if database is compromised, passwords are safe
✅ Two users with same password get different hashes
✅ Cannot reverse hash to get original password
✅ Brute-force attacks are extremely slow

---

## 🏗️ Task 6: Layered Architecture

### What It Does:
Organizes code into separate layers for maintainability:

```
Controller Layer
    ↓ (HTTP Requests)
Service Layer
    ↓ (Business Logic)
Repository Layer
    ↓ (Database Queries)
Database
```

### How to Use It:

Each layer has a specific responsibility:

**1. Controller** (`AuthController.java`)
- Receives HTTP requests
- Validates request format
- Calls service methods
- Returns HTTP responses

**2. Service** (`AuthService.java`)
- Contains business logic
- Validates user data
- Encrypts passwords
- Generates JWT tokens
- Calls repository methods

**3. Repository** (`UserRepository.java`)
- Interacts with database
- Saves/retrieves user records
- Performs queries

**4. Entity** (`User.java`)
- Represents database table structure
- Defines user fields (id, name, email, password, role)

**5. DTO** (Data Transfer Objects)
- `LoginRequest.java` - Login form data
- `RegisterRequest.java` - Registration form data
- `AuthResponse.java` - Response with token
- `UserResponse.java` - User info response

### Example Flow:

```
Frontend sends POST /api/auth/login
   ↓
Controller receives LoginRequest
   ↓
Service validates email & password
   ↓
Service hashes password & compares with database
   ↓
Repository queries user from database
   ↓
Service generates JWT token
   ↓
Controller returns AuthResponse
   ↓
Frontend receives token & saves to localStorage
```

---

## 📊 Task 7: Database with H2 (In-Memory)

### What It Does:
- **In-Memory Database** → Data stored in RAM (resets when server stops)
- **Auto Schema Generation** → Tables created automatically on startup
- **Perfect for Development** → No PostgreSQL setup needed
- **H2 Console** → Visual database browser at `/h2-console`

### How to Use It:

#### 7.1 View Database Console

1. Go to `http://localhost:3001/h2-console`
2. Connection settings (pre-filled):
   - URL: `jdbc:h2:mem:cineverse_auth`
   - Username: `sa`
   - Password: (leave blank)
3. Click **"Connect"**
4. Browse tables: `USER_T` (contains registered users)

#### 7.2 Query Users from Console

```sql
SELECT * FROM USER_T;
```

Output:
```
ID  NAME          EMAIL                   PASSWORD_HASH           ROLE
1   John Doe      john@example.com        $2a$12$...bcrypt...    USER
2   Admin User    admin@example.com       $2a$12$...bcrypt...    ADMIN
```

#### 7.3 Database Reset

When you restart the backend server:
- All data is wiped
- Fresh database created
- Perfect for testing

---

## 🧪 Complete Testing Workflow

### Step 1: Start Both Servers

```bash
# Terminal 1: Backend
cd backend/auth-service
java -jar target/auth-service-0.0.1-SNAPSHOT.jar

# Terminal 2: Frontend
cd frontend
export PATH="/tmp/node-v22.12.0-darwin-arm64/bin:$PATH"
npm run dev
```

### Step 2: Test Registration via API

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "email": "alice@example.com",
    "password": "AlicePass123!",
    "role": "USER"
  }'
```

### Step 3: Test Login via API

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "AlicePass123!"
  }'
```

Save the token from response.

### Step 4: Test Protected Endpoint

```bash
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer <your_token_here>"
```

### Step 5: Test UI

1. Open `http://localhost:5173`
2. Click **"Don't have an account? Register"**
3. Fill registration form
4. Click **"Register"**
5. Log in with registered credentials
6. See dashboard with your name and role

---

## 🐛 Troubleshooting

### Issue: "Invalid token" error

**Solution**: 
- Token may have expired (24 hour limit)
- Log in again to get fresh token
- Token format must be: `Bearer <token>`

### Issue: "User not found" on login

**Solution**:
- Register user first
- Check email spelling is correct
- Try with different email

### Issue: Backend not responding

**Solution**:
```bash
# Check if backend is running
curl http://localhost:3001/h2-console

# If not, restart:
java -jar backend/auth-service/target/auth-service-0.0.1-SNAPSHOT.jar
```

### Issue: Frontend can't connect to backend

**Solution**:
- Ensure backend is running on port 3001
- Check CORS is enabled (it is by default)
- Verify API URL in frontend: `http://localhost:3001`

---

## 🎯 Key Takeaways

✅ **User Registration** → Create accounts securely
✅ **JWT Authentication** → Stateless, scalable auth system
✅ **Password Security** → BCrypt hashing protects data
✅ **Role-Based Access** → Different users, different permissions
✅ **Layered Architecture** → Clean, maintainable code
✅ **H2 Database** → Easy development database
✅ **Frontend Integration** → React Context + localStorage for auth state

---

## 📈 Next Steps (Day 04+)

1. **Movie Service** → Endpoints to browse movies
2. **Review Service** → Endpoints to manage reviews
3. **API Gateway** → Single entry point for all services
4. **Advanced Auth** → Refresh tokens, 2FA
5. **Production Database** → Switch to PostgreSQL with migrations

---

## 📞 API Reference

### Auth Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ No |
| POST | `/api/auth/login` | Login & get token | ❌ No |
| GET | `/api/auth/profile` | Get current user | ✅ Yes |
| POST | `/api/auth/logout` | Logout user | ✅ Yes |

### Response Format

**Success**:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error**:
```json
{
  "success": false,
  "message": "Error description",
  "error": "error_code"
}
```

---

**Happy coding! 🚀**
