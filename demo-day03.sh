#!/bin/bash

# Quick Day 03 Demo - Shows all features working

echo "🎬 CineVerse Day 03 - Live Demo"
echo "=================================="
echo ""

# Register User 1
echo "1️⃣  REGISTERING USER - John Doe"
echo "   POST /api/auth/register"
echo ""
curl -s -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "JohnPass123!",
    "role": "USER"
  }' | python3 -m json.tool 2>/dev/null
echo ""
echo "---"
echo ""

# Login User 1
echo "2️⃣  LOGIN - Get JWT Token"
echo "   POST /api/auth/login"
echo ""
LOGIN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "JohnPass123!"
  }')

echo "$LOGIN" | python3 -m json.tool 2>/dev/null

# Extract token
TOKEN=$(echo "$LOGIN" | python3 -c "import sys, json; print(json.load(sys.stdin).get('data', {}).get('token', ''))" 2>/dev/null)

echo ""
echo "Token: ${TOKEN:0:50}..."
echo ""
echo "---"
echo ""

# Test protected endpoint
echo "3️⃣  ACCESS PROTECTED ENDPOINT - Using JWT Token"
echo "   GET /api/auth/profile"
echo "   Authorization: Bearer <token>"
echo ""
curl -s -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer $TOKEN" \
  | python3 -m json.tool 2>/dev/null
echo ""
echo "---"
echo ""

# Register Admin
echo "4️⃣  REGISTERING ADMIN USER"
echo "   POST /api/auth/register (with role=ADMIN)"
echo ""
curl -s -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "AdminPass123!",
    "role": "ADMIN"
  }' | python3 -m json.tool 2>/dev/null
echo ""
echo "---"
echo ""

# Database check
echo "5️⃣  H2 DATABASE CONSOLE"
echo "   Access at: http://localhost:3001/h2-console"
echo "   URL: jdbc:h2:mem:cineverse_auth"
echo "   User: sa"
echo "   Password: (empty)"
echo ""

echo "✅ All Day 03 features demonstrated!"
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:3001"
