# 💰 Expense Tracker  

An aesthetically pleasing, fully responsive web application to track your **income and expenses** with a clean dashboard, interactive graphs, and seamless user experience. Built with **React (Vite)** for the frontend, **Node.js + Express** for the backend, and **MongoDB** for the database.  

🚀 Deployed here: [Expense Tracker Live](https://expense-tracker-1-vbbg.onrender.com) <br> <br>
🎥 Demo Video :  [Watch Demo](https://drive.google.com/file/d/1SDc7Qhct6ptgvxPKo7ti71g7z7St3p_x/view?usp=sharing)  
---

## ✨ Features  

### 🔑 Authentication  
- Sign up with **name, email, password**, and optional profile picture (charavatar auto-generated if no picture).  
- Secure login with email & password.  
<img width="1894" height="899" alt="image" src="https://github.com/user-attachments/assets/105d9d2c-f452-4b76-b70f-2dcb7b4ac268" />

### 📊 Dashboard  
- Overview of **Total Balance, Total Income, Total Expense**.  
- **Recent Transactions** (both income & expenses) with quick “See All” redirect to detailed sections.  
- Visual insights:  
  - **Pie charts** for *Financial Overview* and *Last 60 Days Income*.  
  - **Bar graph** for *Last 30 Days Expenses*.  
<img width="1898" height="786" alt="image" src="https://github.com/user-attachments/assets/99524f45-b667-4af0-9ac4-2e397118a177" />

### 💵 Income Section  
- **Bar graph** displaying income trends.  
- **Add Income** with emoji icon, name, amount, date (stored in MongoDB instantly).  
- **Income Sources list** with hover-based delete option (confirmation before deletion).  
- **Download as Excel** (name, amount, date).  
<img width="1898" height="899" alt="image" src="https://github.com/user-attachments/assets/fd8ae670-8168-40e9-bbed-877f8bc2a5d8" />

### 💸 Expense Section  
- **Line chart** displaying expense trends.  
- **Add Expense** with emoji icon, name, amount, date (stored in MongoDB instantly).  
- **Expense Sources list** with hover-based delete option (confirmation before deletion).  
- **Download as Excel** (name, amount, date).  
<img width="1897" height="897" alt="image" src="https://github.com/user-attachments/assets/ee6106aa-c652-447b-a2a7-cdea8793161a" />

### 👤 Profile  
- Edit name, profile picture, and change password (with re-verification).  

### 🔒 Logout  
- Secure logout with redirection to login page.  

---

## 🛠️ Tech Stack  

- **Frontend:** React (Vite), TailwindCSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Deployment:** Render  

---

## 📱 Responsive & Aesthetic  
- Optimized for **mobile and desktop**.  
- Minimal, modern, and **aesthetically pleasing UI**.  

---

## 📂 How to Run Locally  

```bash
# Clone repo
git clone <your-repo-link>

# Install dependencies
cd expense-tracker
npm install

# Run development server
npm run dev
