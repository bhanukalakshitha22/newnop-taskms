# TaskFlow — Frontend

React + TypeScript single-page app for the TaskFlow task management system.

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | 18+ |
| npm | 9+ |

The backend API must be running before starting the frontend. See `backend/README.md`.

---

## Installation

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

> If you omit this file, the app defaults to `http://localhost:5000/api`.

---

## Running

### Development server

```bash
npm run dev
```

App is available at: `http://localhost:5173`

### Production build

```bash
npm run build       # outputs to dist/
npm run preview     # preview the production build locally
```

---

## Default Login

| Field | Value |
|---|---|
| Email | `admin@example.com` |
| Password | `Admin@123` |

---

## Pages & Routes

| Route | Description | Auth required |
|---|---|---|
| `/login` | Sign in with email + password | — |
| `/register` | Create a new account | — |
| `/tasks` | Task list with filters and sort | ✅ |
| `/tasks/new` | Create a new task | ✅ |
| `/tasks/:id` | Task detail view | ✅ |
| `/tasks/:id/edit` | Edit an existing task | ✅ |

---

## Features

- **Authentication** — JWT stored in `localStorage`; session validated on load
- **Role-aware UI** — admins can assign tasks to any user; regular users can only self-assign
- **Task list**
  - Stats bar (Total / Open / In Progress / Testing / Done)
  - Filter by status, priority, title search
  - Sort by newest, oldest, due date, priority, or title
  - Overdue indicator on tasks past their due date
- **Toast notifications** — success/error feedback on every create, edit, delete, login, register, and logout action
- **Protected routes** — unauthenticated users are redirected to `/login`

---

## Tech Stack

| Package | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| React Router v6 | Client-side routing |
| Axios | HTTP client |

---

## Project Structure

```
src/
├── api/            # Axios API clients (auth, tasks, users)
├── auth/           # AuthContext, ProtectedRoute
├── components/     # Navbar, TaskCard, TaskForm, FilterBar, Toast
├── pages/          # Login, Register, TaskList, TaskDetail, TaskCreate, TaskEdit
├── types/          # Shared TypeScript types and constants
├── App.tsx         # Route definitions
├── main.tsx        # App entry point
└── index.css       # Global styles
```
