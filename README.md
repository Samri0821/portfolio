# Personal Portfolio Management System

A full-stack personal portfolio website built with React, Express, and JSON database.

## 👩‍💻 Author

**Name:** Samrawit Yirga (Sam)  
**Field:** Computer Science Student

---

## 📖 Project Description

This project is a full stack personal portfolio management system developed to showcase skills, projects, and experience. Unlike a static portfolio, this system allows dynamic content management where you can add, update, or delete portfolio information through backend APIs.

**Features:**
- Visitors can view your profile, projects, skills, experience, and contact you
- Admin dashboard to manage all content
- Profile picture placeholder ready for upload
- Contact form with message management
- Responsive design with Tailwind CSS

---

## 🛠️ Technologies Used

### Frontend
- React.js (Vite)
- Tailwind CSS
- Lucide Icons
- React Router

### Backend
- Node.js
- Express.js
- CORS
- UUID

### Database
- JSON file (initial setup, ready for MongoDB upgrade)

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js installed

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Start the Backend Server

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:5000`

### Step 3: Install Frontend Dependencies

Open a new terminal:

```bash
cd client
npm install
```

### Step 4: Start the Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

---

## 📡 API Endpoints

### Profile
- `GET /api/profile` - Get profile info
- `PUT /api/profile` - Update profile

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Add new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add skill
- `DELETE /api/skills/:id` - Delete skill

### Experience
- `GET /api/experience` - Get all experience
- `POST /api/experience` - Add experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience

### Contact/Messages
- `POST /api/contact` - Submit contact form
- `GET /api/messages` - Get all messages (admin)
- `DELETE /api/messages/:id` - Delete message

---

## 📁 Project Structure

```
portfolio/
│
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/              # Express backend
│   ├── app.js
│   └── package.json
│
├── data/                # JSON database
│   └── db.json
│
└── README.md
```

---

## 🔐 Future Improvements

- Add authentication system (admin login)
- Implement image upload (Multer)
- Use MongoDB database
- Deploy application (Netlify + Render)
- Add resume upload/download

---

## 📝 Notes

- The profile picture is currently managed via URL in the Admin panel
- To add a profile picture: Go to Admin → Profile → Edit → enter image URL
- All data is stored in `data/db.json`
- The contact form saves messages to the database

---

## 📞 Contact

Feel free to reach out through the contact form on the website!
