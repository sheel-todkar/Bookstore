# Book Store Application

This is a full-stack Book Store web application featuring a React frontend and a Node.js/Express backend.

---

## Project Structure

- `backend/` — Backend server code, APIs, database models, and scripts.
- `frontend/` — Frontend React application using Vite and styled with Tailwind CSS.

---

## Features

- REST API for managing books (Create, Read, Update, Delete)
- React frontend for browsing and managing books
- Responsive UI with Tailwind CSS
- Seed script to populate initial books data

---

## Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node.js)
- MongoDB or your chosen database (if using MongoDB based on your model)

---

## Setup Instructions

### Backend

1. Navigate to the backend folder:

   cd backend

text

2. Install backend dependencies:

npm install

text

3. Configure your database connection and other settings in `config.js`.

4. Optionally, seed your database with initial data:

node seedBooks.js

text

5. Start the backend server:

npm start

text

The backend server will typically run on `http://localhost:5000` (check your config).

---

### Frontend

1. Navigate to the frontend folder:

cd frontend/book-store

text

2. Install frontend dependencies:

npm install

text

3. Start the frontend development server:

npm run dev

text

Open your browser to the URL shown (usually `http://localhost:3000`).

---

## Available Scripts

### Backend

- `npm start` — Starts the backend server.
- `node seedBooks.js` — Seeds the database with initial book data.

### Frontend

- `npm run dev` — Starts the React frontend in development mode.
- `npm run build` — Builds the frontend for production deployment.

---

## Technology Stack

- **Backend:** Node.js, Express.js, MongoDB (or configured DB), Mongoose
- **Frontend:** React.js, Vite, Tailwind CSS
- **Tools:** ESLint, PostCSS

---

## Notes

- Make sure the backend server is running before starting the frontend to ensure API calls work correctly.
- Adjust any ports or database connection strings in `backend/config.js` and frontend environment files if necessary.
- For production, build the frontend using `npm run build` and configure your server to serve the static files or deploy frontend and backend separately.

---

## License

This project is open-source under the MIT License.

---

## Contact

Your Name – your.email@example.com

Project repository: [Add your repo link here]

---

Feel free to update this README with more details such as API endpoint documentation or deployment notes if needed. Let me know if you want me to help generate those as well!

