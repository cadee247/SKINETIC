# 🌸 Skinetic - Skincare Routine Builder

A full-stack skincare routine app where users can add products, categorize them by type, and get ingredient-based benefits displayed in a clean glass-style UI.

---

## ✨ Features
- 🧴 **Add Products** with name, type (cleanser, toner, serum, etc.), and ingredients.  
- 🌿 **Ingredient Benefits** automatically displayed using a curated benefits dataset.  
- 🎨 **Glassmorphic UI** with soft gradients and modern styling.  
- 📋 **Routine Builder** that shows your products and their unique ingredient benefits.  
- 🔒 **Authentication Ready** – easily extend with signup/login using JWT or your auth system.  

---

## 🛠 Tech Stack
- **Frontend:** React + Vite + TailwindCSS (or plain CSS with glassmorphism)  
- **Backend:** Node.js + Express  
- **Database:** MongoDB (via Mongoose)  
- **Auth:** JWT with HTTP-only cookies (optional, for login/signup)  

---

## 📂 Project Structure
/project-root
│── backend/ # Express + MongoDB API
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ └── server.js
│
│── frontend/ # React app
│ ├── src/
│ │ ├── App.js # Main component
│ │ ├── App.css # Global styles (glassmorphic)
│ │ ├── components/ # Form, RoutineCard, etc.
│ │ └── index.js
│ └── vite.config.js
│
└── README.md




---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/skinetic.git
cd skinetic
2. Backend Setup
cd backend
npm install
npm run dev


This starts the Express API on http://localhost:5000.

3. Frontend Setup
cd frontend
npm install
npm run dev


This starts the React app on http://localhost:5173.

⚙️ Environment Variables

In backend/.env create:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecretkey
PORT=5000


🤝 Contributing

Pull requests are welcome! Please open an issue first for major changes.

📄 License

MIT License © 2025 Cadee Rousseau