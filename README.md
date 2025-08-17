# 📝 Blog App

A full-stack **Blogging Application** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) featuring user authentication, session management, and blog post creation. This version uses session-based authentication with Passport.js and supports a smooth UX for writing and viewing blog posts.

---
## Live Preview:
[Link](https://joshuasblog.vercel.app/)
---

## 🚀 Features

### 🔐 Authentication
- Register / Login with session-based authentication using `passport-local-mongoose`
- Passwords securely hashed and stored in MongoDB
- Session data persisted in MongoDB using `connect-mongo`

### ✍️ Blogging
- Authenticated users can create blog posts with a **title** and **content**
- Posts are tagged with the **author's name**
- All users (authenticated or not) can view blog posts on the homepage

### 🧠 Session Management
- Sessions are persisted in MongoDB and maintained across page reloads
- Backend exposes `/current_user` to sync frontend session state

### 🌐 API Integration
- Uses **Axios** for client-server communication
- Routes use `withCredentials: true` to manage sessions

---
![image](https://github.com/user-attachments/assets/90b750ed-452a-4ab8-adb3-b3f04b116cb7)

## 🧩 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React.js, React Router, Axios     |
| Backend   | Express.js, Node.js               |
| Database  | MongoDB Atlas                     |
| Auth      | Passport.js, passport-local-mongoose |
| Session   | express-session, connect-mongo    |
| Styling   | Custom CSS                        |


## 🗂️ Folder Structure
```
/backend
    /config         # Configuration files (e.g., environment, middleware, etc.)
    /controllers    # Backend logic and route handlers
    /models         # Mongoose schemas for users, posts, etc.
    /routes         # Express routes for authentication, posts, and general pages
    index.js        # Main Express server entry point
    .env            # Environment variables

/frontend
    /public          # Static assets like index.html and favicon
    /src
        /components  # Reusable React components (Navbar, Login, Home, etc.)
            About.jsx
            Contact.jsx
            Compose.jsx
            Home.jsx
            Login.jsx
            Register.jsx
            Spinner.jsx
            Navbar.jsx
        App.jsx       # Root component
        index.js      # ReactDOM render entry point
    package.json      # Frontend dependencies and scripts

README.md             # You're here!

```


## 🌐 Backend API Endpoints

| Endpoint         | Method | Auth Required | Description                          |
|------------------|--------|----------------|--------------------------------------|
| `/register`       | POST   | ❌             | Register a new user                  |
| `/login`          | POST   | ❌             | Log in and start a session           |
| `/logout`         | GET    | ✅             | Logout and destroy the session       |
| `/current_user`   | GET    | ❌             | Fetch current logged-in user         |
| `/compose`        | POST   | ✅             | Create a new blog post               |
| `/posts`          | GET    | ❌             | Fetch all blog posts                 |

---

## 🧪 Component Breakdown

### ✅ Register.jsx
- Collects user name, email, password, and mobile number
- Calls `/register` to create account and login user
- Redirects to homepage upon success

### ✅ Login.jsx
- Accepts email and password
- Authenticates user with `/login`
- Stores user data and navigates to homepage on success
![image](https://github.com/user-attachments/assets/09ed0f02-f158-42a9-846d-fec86788a9a6)

### ✅ Compose.jsx
- Authenticated users can write and submit posts
- Posts include `title`, `content`, and the `author`'s name
![image](https://github.com/user-attachments/assets/f35d2e45-199e-4d3a-ba18-e5a62d204521)

### ✅ Home.jsx
- Fetches and displays all blog posts
- Uses loading spinner before rendering
- Greets logged-in users


## 🧑‍💻 How to Run Locally

### 🔧 Backend Setup
```
cd blog-v3-back
npm install
touch .env
```
Create a .env file and add:
MYDBUSER=yourMongoDBUsername
MYDBPASS=yourMongoDBPassword
SECRET=yourSessionSecret
```
Run the server:
node index.js
```
### 🌐 Frontend Setup
```
cd blog-v3-front
npm install
npm start
Frontend will run on http://localhost:3000
Backend will run on http://localhost:8000
```
### 📌 Future Improvements
🔐 Migrate to JWT-based authentication

📝 Add rich text editor (Quill, TinyMCE)

🎨 Modern UI with TailwindCSS or Material UI

🔍 Search & filter blog posts

📁 Add user profile pages and edit/delete post functionality


👨‍💻 Author
Made by Joshua Samuel
