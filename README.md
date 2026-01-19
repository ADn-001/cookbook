# Cookbook – Personal Recipe Manager

A clean and simple **MERN stack** web application where users can:

- Create an account (email + username + password)
- Add, edit, view and delete personal recipes
- Upload recipe photos (with nice default fallback)
- See recipes in a beautiful carousel dashboard
- Enjoy a warm, traditional cookbook aesthetic

**New users** automatically receive a helpful "How to Get Started" recipe.

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- express-session + connect-mongo (session storage)
- bcrypt (password hashing)
- multer (image uploads)

**Frontend**
- React 18
- React Router v6
- Axios (with credentials)
- react-responsive-carousel
- Vite (build tool)

## Project Structure

```
cookbook/
├── client/                 # React frontend (Vite)
│   ├── public/
│   │   └── images/
│   │       └── default.jpg
│   ├── src/
│   └── package.json
│
├── server/                 # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── public/
│   │   ├── images/
│   │   └── uploads/       ← images get saved here
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## How to Run the Project Locally

### 1. Prerequisites

You need to have installed:

- **Node.js** ≥ 18
- **MongoDB** (local or Atlas – easiest is local)
  - Local: make sure MongoDB is running (`mongod`)

### 2. Clone the project

```bash
git clone <repository-url>
cd cookbook
```

### 3. Backend setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# or manually create .env with the following content:

# ----- server/.env -----
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cookbook
SESSION_SECRET=super-long-random-secret-change-this-please
BASE_URL=http://localhost:5000
NODE_ENV=development
# -----------------------
```

### 4. Frontend setup

```bash
cd ../client

# Install dependencies
npm install

# Create .env.local (optional – Vite uses proxy by default)
# You can leave it empty if you use the proxy in vite.config.js
```

### 5. Start the application

**Option 1 – Recommended (two terminals)**

**Terminal 1 – Backend**

```bash
cd server
npm run dev
# or
node server.js
```

**Terminal 2 – Frontend**

```bash
cd client
npm run dev
```

→ Open http://localhost:3000

**Option 2 – Using concurrently (one terminal)**

Add this to root `package.json` (optional):

```json
{
  "scripts": {
    "start:backend": "cd server && npm run dev",
    "start:frontend": "cd client && npm run dev",
    "dev": "concurrently \"npm run start:backend\" \"npm run start:frontend\""
  }
}
```

Then just run from root:

```bash
npm run dev
```

### 6. First time usage

1. Open http://localhost:3000
2. Click **Sign Up**
3. Create account → you will be automatically logged in
4. You should see the **"How to Get Started"** welcome recipe card
5. Try adding your first real recipe!

## Important Notes

- Images are saved in `server/public/uploads/`
- Default image should be placed in `server/public/images/default.jpg`
- All API requests use **cookies** → make sure browser allows third-party cookies in dev (or use same domain/port in production)

## Recommended VS Code Extensions

- ESLint
- Prettier
- JavaScript (ES6) code snippets
- MongoDB for VS Code
- Thunder Client (great API testing alternative to Postman)

## Good luck & happy cooking! 🍳