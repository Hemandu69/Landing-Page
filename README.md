# 🇮🇳 Mera Yuva Bharat (MY Bharat) - Official Portal & Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0+-D71F00?style=for-the-badge&logo=python)](https://www.sqlalchemy.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)](https://www.mysql.com/)

---

## 📌 Executive Summary

**Mera Yuva Bharat (MY Bharat)** is an autonomous body established by the Government of India to serve as an overarching youth development platform. This repository contains the complete, production-ready full-stack application comprising:

1. **Frontend**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS v4, Framer Motion, Axios, `@tanstack/react-query`, React Hook Form, and Zod.
2. **Backend**: Python 3.12+, FastAPI, SQLAlchemy 2.x, Alembic, MySQL 8, Pydantic v2, JWT (HS256), Passlib (bcrypt), and Uvicorn.

The application features secure passwordless authentication (OTP via Email/SMS), multi-device session management with refresh token rotation, authenticated user profile management with avatar image processing, and a searchable opportunities portal.

---

## 🏗️ System Architecture

The project strictly follows a **Clean Layered Architecture** ensuring complete separation of concerns:

```
                  ┌──────────────────────────────────────────────────┐
                  │                 React 19 Frontend                │
                  │  (Next.js App Router, TailwindCSS, React Query)  │
                  └─────────────────────────┬────────────────────────┘
                                            │ HTTP / REST APIs (Bearer JWT)
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │                FastAPI REST Controllers          │
                  │           (Thin Controller Route Handlers)       │
                  └─────────────────────────┬────────────────────────┘
                                            │ Dependency Injection
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │                   Service Layer                  │
                  │      (Business Logic, Token & Session Rules)     │
                  └─────────────────────────┬────────────────────────┘
                                            │ Abstract Interfaces
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │                 Repository Layer                 │
                  │          (ORM Database Data Access Layer)        │
                  └─────────────────────────┬────────────────────────┘
                                            │ SQLAlchemy 2.x Statements
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │                  MySQL 8 Database                │
                  └─────────────────────────┬────────────────────────┘
```

---

## 📁 Repository Directory Structure

```text
landing-page/
├── backend/                        # FastAPI Backend Application
│   ├── alembic/                    # Database Migration Environment
│   │   ├── versions/               # Generated Revision Scripts
│   │   ├── env.py                  # Dynamic SQLAlchemy Metadata Configuration
│   │   └── script.py.mako          # Revision Template for Custom Types (GUID)
│   ├── app/
│   │   ├── api/                    # API Routing & Controllers
│   │   │   ├── dependencies.py     # Bearer JWT Authentication Dependency
│   │   │   ├── router.py           # Central Router Registry
│   │   │   └── routes/
│   │   │       ├── auth.py         # OTP & Session Management Endpoints
│   │   │       ├── health.py       # Health Check Endpoint (/api/health)
│   │   │       ├── opportunity.py  # Opportunities Browsing & Search Endpoints
│   │   │       └── user.py         # User Profile Management Endpoints
│   │   ├── core/
│   │   │   ├── config.py           # Settings Singleton (Pydantic Settings)
│   │   │   ├── exceptions.py       # Global JSON Exception Handlers
│   │   │   └── logging.py          # Application Logger Setup
│   │   ├── database/
│   │   │   ├── base.py             # DeclarativeBase with Constraint Naming
│   │   │   └── session.py          # Engine & Session Generator (get_db)
│   │   ├── models/                 # SQLAlchemy 2.x ORM Models
│   │   │   ├── base_model.py       # Timestamp Mixin (created_at, updated_at)
│   │   │   ├── enums.py            # Reusable System Enumerations
│   │   │   ├── login_history.py    # Login Audit Trail Model
│   │   │   ├── opportunity.py      # Opportunities Model
│   │   │   ├── otp_request.py      # OTP Audit Model
│   │   │   ├── session.py          # User Multi-Device Session Model
│   │   │   └── user.py             # User Model (UUID Primary Key)
│   │   ├── repositories/           # Data Access Layer (SQLAlchemy 2.x)
│   │   │   ├── base_repository.py  # Reusable Generic BaseRepository[ModelType]
│   │   │   ├── login_history_repository.py
│   │   │   ├── opportunity_repository.py
│   │   │   ├── otp_repository.py
│   │   │   ├── session_repository.py
│   │   │   └── user_repository.py
│   │   ├── schemas/                # Pydantic v2 Schemas
│   │   │   ├── auth.py             # Auth & OTP Request/Response Schemas
│   │   │   ├── opportunity.py      # Opportunity Summary & Filter Schemas
│   │   │   ├── session.py          # Session Listing Schemas
│   │   │   └── user.py             # User Profile & Public Profile Schemas
│   │   ├── services/               # Business Logic Layer
│   │   │   ├── auth_service.py     # Auth & OTP Flow Orchestration
│   │   │   ├── base_service.py     # Base Service Class
│   │   │   ├── jwt_service.py      # JWT Signing, Nonce & Verification
│   │   │   ├── opportunity_service.py # Opportunities Search & Pagination
│   │   │   ├── otp_service.py      # 6-Digit OTP Generation & SHA-256 Hashing
│   │   │   ├── session_service.py  # Multi-Device Sessions & Token Rotation
│   │   │   └── user_service.py     # User Management & Avatar Processing
│   │   └── utils/
│   │       └── validators.py       # Phone & Email Regex Validators
│   ├── .env.example                # Example Backend Environment Template
│   ├── alembic.ini                 # Alembic Migration Engine Config
│   ├── pyproject.toml              # Build System Config (UTF-8 without BOM)
│   ├── requirements.txt            # Python Dependencies Specification
│   └── run.py                      # Application Launcher Script
│
└── frontend/                       # Next.js 16 React Application
    ├── app/
    │   ├── components/
    │   │   ├── auth/               # Auth UI Components
    │   │   │   ├── AuthButton.tsx
    │   │   │   ├── AuthInput.tsx
    │   │   │   ├── Countdown.tsx   # 120s OTP Timer Component
    │   │   │   ├── GoogleButton.tsx
    │   │   │   ├── LoginModal.tsx  # Modal Dialog (Framer Motion)
    │   │   │   ├── OtpInput.tsx    # 6-Digit Auto-Focus OTP Input
    │   │   │   ├── ProtectedRoute.tsx # Route Guard Component
    │   │   │   └── Toast.tsx       # Notification Toast
    │   │   └── dashboard/          # Profile Dashboard Components
    │   │       ├── DashboardLayout.tsx
    │   │       ├── ProfileForm.tsx # Profile Form (React Hook Form + Zod)
    │   │       ├── ProfileHeader.tsx
    │   │       ├── ProfilePhotoUpload.tsx # Drag & Drop Avatar Uploader
    │   │       └── ProfileSkeleton.tsx # Loading Skeleton
    │   ├── context/
    │   │   └── AuthContext.tsx     # Global Auth State & Token Persistence
    │   ├── dashboard/
    │   │   └── page.tsx            # Protected Dashboard Route (/dashboard)
    │   ├── hooks/                  # Custom React Hooks
    │   │   ├── useDetectLoginType.ts
    │   │   ├── useOtpTimer.ts
    │   │   └── useProfile.ts       # React Query Profile Hooks
    │   ├── landing page/           # Landing Page Sections & Header Navbar
    │   │   └── Navbar/
    │   │       └── Header.jsx      # Header with Dynamic User Dropdown
    │   ├── schemas/
    │   │   └── profileSchema.ts    # Zod Profile Form Validation
    │   ├── services/
    │   │   ├── apiClient.ts        # Axios Instance with 401 Token Refresh
    │   │   ├── profileService.ts   # Profile API Service Calls
    │   │   └── auth/
    │   │       └── authService.ts  # Auth API Service Calls
    │   ├── types/
    │   │   ├── auth.ts             # Auth Type Definitions
    │   │   └── profile.ts          # Profile Type Definitions
    │   ├── layout.tsx              # Root Layout
    │   ├── page.tsx                # Home Landing Page
    │   └── providers.tsx           # QueryClientProvider & AuthProvider
    ├── .env.example                # Example Frontend Environment Template
    ├── package.json                # Node.js Dependencies & Scripts
    └── tsconfig.json               # TypeScript Compiler Configuration
```

---

## ⚡ Core Feature Modules

### 1. Authentication & Security Engine
* **Passwordless OTP Authentication**: Users can request a 6-digit numeric OTP delivered via Email or Phone (`POST /api/auth/request-otp`).
* **Cryptographic SHA-256 OTP Hashing**: Raw OTP codes are never stored in plaintext; only SHA-256 digests are stored in `otp_requests`.
* **Multi-Device Session Management**: Upon verification (`POST /api/auth/verify-otp`), a `UserSession` is generated, storing device type (`Desktop`, `Mobile`), browser, OS, client IP address, and a SHA-256 hash of the long-lived refresh token.
* **Refresh Token Rotation**: `POST /api/auth/refresh` rotates the refresh token using unique `jti` nonces, issuing new access/refresh token pairs and updating `last_used_at` timestamps.
* **Session Revocation**: Users can logout from their current device (`POST /api/auth/logout`), logout from all active devices (`POST /api/auth/logout-all`), or revoke specific sessions by ID (`DELETE /api/auth/sessions/{session_id}`).

### 2. User Profile Management
* **Authenticated Profile Fetching**: `GET /api/users/me` retrieves complete authenticated user details.
* **Controlled Profile Updates**: `PATCH /api/users/me` allows modifying allowed fields (`first_name`, `last_name`, `date_of_birth`, `gender`, `country`, `address_line_1`, `address_line_2`, `bio`, `public_profile`), while strictly locking system fields (`email`, `phone`, `created_at`).
* **Avatar Upload & Processing**: `POST /api/users/profile-image` validates image content type (`JPEG`, `PNG`, `WEBP`) and enforces a 5MB maximum file size before saving to storage and returning the static URL.
* **Public Profile View**: `GET /api/users/{user_id}` returns public profile attributes or 404 if set to private.

### 3. Opportunities Portal
* **Filterable & Searchable Opportunities**: `GET /api/opportunities` supports multi-column keyword searching across `title`, `organization_name`, and `description`, along with filtering by `category`, `type` (`INTERNSHIP`, `JOB`, `VOLUNTEERING`, `EVENT`, `SCHOLARSHIP`, `COURSE`), `mode` (`ONLINE`, `OFFLINE`, `HYBRID`), and `featured` status.
* **Pagination Metadata**: Returns total count, page size, total pages, and boolean `has_next`/`has_previous` flags.

---

## 🔌 API Endpoint Specifications

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/request-otp` | Request a 6-digit OTP via Email or Phone | No |
| `POST` | `/api/auth/verify-otp` | Verify OTP code and obtain JWT tokens | No |
| `POST` | `/api/auth/resend-otp` | Resend a fresh OTP code | No |
| `POST` | `/api/auth/refresh` | Rotate refresh token & obtain new access token | No (Refresh Token) |
| `POST` | `/api/auth/logout` | Revoke current device session | Optional |
| `POST` | `/api/auth/logout-all` | Revoke all active sessions across devices | Yes (Bearer JWT) |
| `GET` | `/api/auth/sessions` | List active device sessions for user | Yes (Bearer JWT) |
| `DELETE`| `/api/auth/sessions/{session_id}` | Revoke specific device session by ID | Yes (Bearer JWT) |
| `GET` | `/api/auth/me` | Retrieve authenticated user profile | Yes (Bearer JWT) |

### User Profile Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/me` | Get complete user profile | Yes (Bearer JWT) |
| `PATCH`| `/api/users/me` | Update allowed profile attributes | Yes (Bearer JWT) |
| `POST` | `/api/users/profile-image` | Upload avatar image (Max 5MB, JPEG/PNG/WEBP) | Yes (Bearer JWT) |
| `DELETE`| `/api/users/profile-image` | Remove custom profile image | Yes (Bearer JWT) |
| `GET` | `/api/users/{user_id}` | Fetch public profile details | No |

### Opportunity Routes (`/api/opportunities`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/opportunities` | Search, filter, sort, and paginate opportunities | No |
| `GET` | `/api/opportunities/featured` | Fetch top featured active opportunities | No |
| `GET` | `/api/opportunities/categories` | Fetch distinct list of available categories | No |
| `GET` | `/api/opportunities/{slug}` | Fetch full details of an opportunity by slug | No |

---

## ⚙️ Environment Configuration Templates (`.env.example`)

Copy the example configuration templates to create your private `.env` files.

### Backend Environment Template (`backend/.env.example`)
Create `backend/.env` from `backend/.env.example`:

```env
APP_NAME="MY Bharat API"
APP_VERSION=1.0.0
DEBUG=True
FRONTEND_URL=http://localhost:3000

# MySQL Database Connection String (RFC-compliant URL encoding)
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/dbname

# JWT Authentication Configuration
SECRET_KEY=change-this-secret-key-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
OTP_EXPIRY_SECONDS=120
```

> 💡 **Security Tip**: Never commit your actual `backend/.env` file to git. If your MySQL password contains special characters like `@`, URL-encode them (e.g. `%40` for `@`) in `DATABASE_URL`.

### Frontend Environment Template (`frontend/.env.example`)
Create `frontend/.env.local` from `frontend/.env.example`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 🛠️ Step-by-Step Installation & Running Guide

### Prerequisites
* **Python**: 3.12 or higher
* **Node.js**: 20 or higher
* **MySQL Server**: 8.0 or higher (Running locally or remotely)

---

### Step 1: Database Setup
Ensure MySQL is running and create the database:

```sql
CREATE DATABASE IF NOT EXISTS landing_page CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### Step 2: Backend Setup & Database Migrations

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Copy the `.env.example` template to `.env` and fill in your private credentials:
   ```bash
   cp .env.example .env
   ```

3. (Optional) Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows PowerShell:
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux:
   source venv/bin/activate
   ```

4. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

5. Run Alembic database migrations:
   ```bash
   python -m alembic upgrade head
   ```

6. Start the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

---

### Step 3: Frontend Setup & Development Server

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Copy the `.env.example` template to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. Install Node.js dependencies:
   ```bash
   npm install
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## 🧪 Interactive API Documentation

Once the backend server is running, explore and test all REST endpoints via the interactive Swagger and ReDoc documentation:

* **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
* **OpenAPI JSON Spec**: [http://127.0.0.1:8000/openapi.json](http://127.0.0.1:8000/openapi.json)

---

## 🛡️ Production Verification & Build Check

### Backend Health Check
```bash
curl http://127.0.0.1:8000/api/health
```
**Response**:
```json
{
  "status": "ok",
  "service": "backend",
  "version": "1.0.0"
}
```

### Frontend Production Build Test
Verify Next.js compilation and static TypeScript analysis:
```bash
cd frontend
npm run build
```
**Expected Output**:
```text
▲ Next.js 16.2.11 (Turbopack)
  Creating an optimized production build ...
✓ Compiled successfully
  Running TypeScript ...
  Finished TypeScript ...
✓ Generating static pages (5/5)
Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /dashboard
```

---

## 📄 License & Attribution

This project is developed as part of the official **Mera Yuva Bharat (MY Bharat)** initiative under the **Ministry of Youth Affairs and Sports, Government of India**. All rights reserved.
