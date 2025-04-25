# Contact List Manager

A full-stack contact management application built with **React**, **TypeScript**, **Vite**, **TailwindCSS**, **Node.js**, **Express**, and **PostgreSQL**.

Users can add, edit, delete, and search contacts with features like infinite scroll, input validation, and responsive UI.

---

## 🚀 Features

### Frontend

- Built with **React + Vite**
- Type-safe using **TypeScript**
- Styled with **TailwindCSS** + **Framer Motion**
- Infinite scroll using IntersectionObserver
- Modal form for adding new contacts
- Search contacts by name or email
- Responsive and clean UI

### Backend

- Built using **Express.js**
- **MVC architecture**
- PostgreSQL integration
- API routes for CRUD operations
- Search support with pagination
- Duplicate entry checks

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, TypeScript, TailwindCSS, Framer Motion
- **Backend:** Node.js, Express.js, PostgreSQL
- **Testing:** Vitest, React Testing Library, Jest, Supertest

---

## 🗃️ PostgreSQL Setup

### Create Databases

Create two PostgreSQL databases:

```sql
CREATE DATABASE contacts_db;
CREATE DATABASE contacts_test_db;
```

### Create Table

Run the following SQL in both databases:

```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);
```

---

## 📦 Folder Structure

### 📁 Frontend
```
frontend/
├── src/
│   ├── components/             # Reusable UI components (ContactForm, ContactList, ContactItem)
│   ├── pages/                  # Pages (e.g., Home.tsx)
│   ├── services/               # API service functions
│   ├── types/                  # Shared TypeScript types
│   ├── __tests__/              # Frontend test files
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
├── index.html
├── .env
├── vite.config.ts
```

### 📁 Backend
```
backend/
├── controllers/            # Logic for handling API requests
├── routes/                 # API route definitions
├── models/                 # DB model logic (CRUD functions)
├── db/                     # Database connection
├── __tests__/              # Backend test files (e.g., contacts.test.js)
├── app.js                  # Main Express app configuration
├── server.js               # Entry point to start server
├── jest.config.js          # Jest configuration for tests
├── jest.setup.js           # Loads .env.test before tests
├── .env
```

---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the repo

```bash
https://github.com/mohit1508/contact-list-manager.git
cd contact-list-manager
```

### 2️⃣ Setup Environment Variables

#### Backend:

#### .env (for dev):

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=contacts_db
```

#### .env.test (for test):

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=contacts_test_db
```

---

#### Frontend:

#### .env:

```
VITE_SERVER_URL=http://localhost:3000
```

---

## 🧪 Run Locally

### ⬅️ Backend

```bash
cd backend
npm install
node server.js
```

### ➡️ Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at `http://localhost:5173`, backend at `http://localhost:3000`

---

## 🧪 Run Tests

### Frontend

```bash
cd frontend
npx vitest
```

### Backend

```bash
cd backend
npm test
```

---

## 📝 Solution Explanation

The application follows a clean **MVC architecture** on the backend and component-based architecture in the frontend. Infinite scroll is implemented using the `IntersectionObserver` API. For consistency and user experience, contacts are sorted alphabetically, and duplicates are handled properly with error messages.

The app is designed to be scalable, readable, and testable. Key logic is modularized, and basic test cases are written for both frontend and backend, covering add, edit, delete, and validations.
