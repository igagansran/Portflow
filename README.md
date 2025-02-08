---

### **📌 Portflow - Full-Stack Project**  

Portflow is a full-stack web application built using **React (TSX), TypeScript, and Node.js**. It provides a dynamic and responsive interface for managing and displaying portfolio-related content.  

---

## **🚀 Features**
- 🏗 **Frontend**: Built with **React (TSX) & TypeScript** for a type-safe and scalable UI.  
- ⚙️ **Backend**: Powered by **Node.js** with Express.js for API handling.  
- 🗄 **Database**: Uses **PostgreSQL/MongoDB** (mention the database you're using).  
- 🎨 **Styling**: Tailwind CSS for a modern and responsive design.  
- 🔐 **Authentication**: Implements secure authentication (JWT or OAuth if used).  
- 🌍 **Deployment**: Hosted on **Vercel/Netlify for frontend and Render/DigitalOcean for backend**.  

---

## **🛠 Tech Stack**
| **Technology**  | **Purpose** |
|----------------|------------|
| React (TSX)  | Frontend UI development |
| TypeScript   | Type safety and maintainability |
| Node.js & Express.js | Backend API development |
| PostgreSQL/MongoDB | Database for storing data |
| Tailwind CSS | Styling framework |
| JWT/OAuth | Authentication (if applicable) |
| Vercel/Netlify | Frontend deployment |
| Render/DigitalOcean | Backend hosting |

---

## **📥 Installation & Setup**
Follow these steps to set up **Portflow** locally:

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/igagansran/Portflow.git
cd Portflow
```

### **2️⃣ Install Dependencies**
Run the following commands to install both frontend and backend dependencies:

```bash
# Install frontend dependencies
cd frontend
npm install  # or yarn install

# Install backend dependencies
cd ../backend
npm install  # or yarn install
```

### **3️⃣ Set Up Environment Variables**
Create a **.env** file in the root of your project and add your API keys, database URLs, and other sensitive information:

```env
# Backend environment variables
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Frontend environment variables
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> ⚠️ **Make sure not to expose sensitive keys in GitHub!** Add `.env` to your `.gitignore` file.

---

## **▶️ Running the Project**
Run the frontend and backend servers:

### **Frontend (React)**
```bash
cd frontend
npm run dev
```

### **Backend (Node.js)**
```bash
cd backend
npm start  # or nodemon server.js
```

---

## **🔗 API Endpoints (Example)**
| **Method** | **Endpoint** | **Description** |
|-----------|-------------|-----------------|
| GET  | `/api/projects`  | Fetch all portfolio projects |
| POST | `/api/auth/login` | User login authentication |
| GET  | `/api/user/profile` | Get user profile info |

---

## **🚀 Deployment**
### **Frontend Deployment**
Deploy the frontend on **Vercel/Netlify**:
```bash
npm run build
```
Upload the `build/` folder to Vercel or Netlify.

### **Backend Deployment**
Deploy the backend on **Render/DigitalOcean**:
```bash
npm start
```

---

## **📜 License**
This project is licensed under the **MIT License**.
