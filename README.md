# 🛒 StorePilot ERP
### Smart Inventory & Billing Management System

StorePilot ERP is a full-stack MERN application designed to simplify inventory, customer, order, invoice, and sales management for small and medium-sized businesses. It provides a secure admin dashboard with real-time business insights and complete inventory control.

---

# 📌 Features

### 🔐 Authentication
- Secure Admin Login
- JWT Authentication
- Protected Routes
- Password Encryption
- Role-based Admin Access

---

### 👥 Customer Management
- Add Customer
- View Customer List
- Update Customer
- Delete Customer
- Customer Contact Information

---

### 📦 Product Management
- Add Products
- Update Products
- Delete Products
- Stock Management
- Low Stock Monitoring
- Product Pricing

---

### 🧾 Order Management
- Create Orders
- Multiple Product Support
- Automatic Total Calculation
- Order Status
  - Pending
  - Paid
  - Cancelled
- Inventory Auto Update

---

### 💳 Invoice Management
- Generate Invoice
- Invoice Status
  - Paid
  - Unpaid
- Due Date Tracking

---

### 📊 Reports & Analytics
- Total Revenue
- Total Customers
- Total Products
- Total Orders
- Paid Invoices
- Unpaid Invoices
- Low Stock Products

---

### ⚙️ Admin Settings
- Admin Profile
- Application Information
- System Status
- Technology Stack Overview

---

# 🛠 Tech Stack

## Frontend

- React.js
- Redux Toolkit
- React Router DOM
- Axios
- React Hook Form
- React Hot Toast
- React Icons
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

# 📂 Project Structure

```
StorePilot
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
├── frontend
│   ├── pages
│   ├── components
│   ├── services
│   ├── redux
│   ├── routes
│   └── App.jsx
│
└── README.md
```

---

# 🚀 Installation
---

## Install Backend

```bash
cd backend
npm install
```

---

## Install Frontend

```bash
cd frontend
npm install
```

---

# ▶ Run Backend

```bash
npm run dev
```

---

# ▶ Run Frontend

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000

MONGO_URI=Your_MongoDB_URI

JWT_SECRET=Your_JWT_Secret
```

---

# 🔒 Security Features

- JWT Authentication
- Protected APIs
- Password Hashing
- Input Validation
- MongoDB Validation
- Secure REST APIs

---

# 🎯 Future Enhancements

- Sales Charts
- Email Notifications
- PDF Invoice Download
- Barcode Scanner
- Dark Mode
- Multi Admin Support
- Customer Portal
- Sales Forecasting
- Dashboard Analytics
- Backup & Restore

---

# 👨‍💻 Author

**Aditya Kumar Bharti**

B.Tech Computer Science Engineering(AI&ML)

---

# 📄 License

This project is developed for educational purposes as a Final Year MERN Stack Project.

---

# ⭐ Support

If you like this project, don't forget to ⭐ star the repository.
