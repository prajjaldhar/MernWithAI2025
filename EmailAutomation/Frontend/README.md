
# 🚀 Google OAuth Protected React Admin Panel

This is a modern, protected React.js admin panel that uses **Google OAuth** for authentication and supports routes like admin dashboard, signup, email automation, and more. The application is designed with conditional route protection and shimmer loading screens for better UX.

---

## 📁 Folder Structure

```
📦src
 ┣ 📂components
 ┃ ┣ 📜Header.jsx
 ┃ ┣ 📜Sidebar.jsx
 ┃ ┗ 📜LoginShimmer.jsx
 ┣ 📂pages
 ┃ ┣ 📜LoginPage.jsx
 ┃ ┣ 📜SignupPage.jsx
 ┃ ┣ 📜AdminPage.jsx
 ┃ ┣ 📜EmailAutomation.jsx
 ┃ ┗ 📜NotFound.jsx
 ┣ 📂context
 ┃ ┗ 📜authContext.jsx
 ┣ 📜App.jsx
 ┣ 📜main.jsx
 ┗ 📜index.css
```

---

## 🔐 Authentication

- **Google Sign-In** is integrated using `@react-oauth/google`.
- Once the user logs in with Google, JWT is decoded via `jwt-decode`.
- User data is saved in `localStorage` under `UserData`.
- App renders protected routes based on `UserData` presence.

---

## 📌 Features

- ✅ Google OAuth Login
- 🔐 Protected Admin & Email Automation routes
- 💫 Shimmer effect during login state load
- 🧭 Client-side routing with React Router v6
- 📦 Centralized state via `authContext`
- 🎨 Tailwind CSS-based styling

---

## ⚙️ How It Works

### App Initialization

- `main.jsx` wraps the app with:
  - `GoogleOAuthProvider` (Google login support)
  - `AuthProvider` (global user state context)

### Routing (`App.jsx`)

- Routes handled:
  - `/login` → LoginPage
  - `/signup` → SignupPage
  - `/admin` → AdminPage (protected)
  - `/emailautomation` → EmailAutomation (protected)
  - `*` → NotFoundPage

### Conditional Rendering

- Shows `Sidebar` and `Header` **only** when user is logged in.
- Displays shimmer (`LoginShimmer`) for 4s on valid routes while checking localStorage.

---

## 🧪 Environment Setup

### 1. Clone this repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add Google Client ID

In `main.jsx`:

```jsx
<GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
```

Get one from [Google Developer Console](https://console.cloud.google.com/).

### 4. Run the app

```bash
npm run dev
```

---

## 🔐 Backend Auth API (Expected)

- POST `/signin` — accepts Google decoded user data
- Returns a valid user object to be saved in `localStorage`

---

## 📌 Notes

- ⚠️ Ensure CORS is enabled on your backend for local testing.
- 🌐 If deploying, replace `http://localhost:4000` with your production backend.

---

## 🛠️ Built With

- React.js + Vite
- React Router v6
- Tailwind CSS
- Google OAuth (`@react-oauth/google`)
- Axios & Fetch
- Context API

---

## 📬 Feedback or Contributions

Feel free to fork, raise issues or suggest improvements via pull requests!
