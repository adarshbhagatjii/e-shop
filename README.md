# 🛒 MERN E-Commerce Website

A full-stack e-commerce web application built with **MongoDB, Express, React, and Node.js (MERN stack)**.  
This project provides a complete shopping experience with authentication, product management, cart system, and checkout flow.  

---

## 🚀 Features

### 👤 Authentication
- User **Signup & Login** with JWT authentication
- Role-based access (**Admin / User**)
- Secure password hashing with bcrypt

### 📦 Products
- **CRUD APIs** for products (Admin only)
- Browse all products with **filters by category & price**
- Product details page with image, description, and pricing

### 🛍️ Cart
- Add items to cart
- Increase/decrease quantity
- Remove individual items
- Clear entire cart
- Cart state persists after login/logout
- Real-time cart total and item count

### 💳 Checkout
- Cart summary with total price
- (Future scope: Payment integration with Razorpay/Stripe)
- Proceed to checkout flow

### 🛠️ Admin Features
- Add new products
- Edit and delete products
- Manage product inventory

---

## 🖼️ Screenshots

### 🏠 Home / Products Page
_Showcase products with filters and add to cart button_

### 🛒 Cart Page
_View cart items, update quantity, and see live total_

### 🔐 Auth Pages
_Signup and Login pages with JWT authentication_

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS** for modern UI
- **Axios** for API calls
- **Context API (Auth + Cart)** for state management

### Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose** (NoSQL Database)
- **JWT Authentication**
- **bcrypt** for password hashing

---

## ⚡ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

App will run at: `http://localhost:3000`  
Backend at: `http://localhost:5000`

---

## 📌 API Endpoints

### Auth
- `POST /api/auth/signup` → Register user
- `POST /api/auth/login` → Login user

### Products
- `GET /api/products` → Get all products (with filters)
- `POST /api/products` → Add new product (Admin only)
- `PUT /api/products/:id` → Update product (Admin only)
- `DELETE /api/products/:id` → Delete product (Admin only)

### Cart
- `GET /api/cart` → Get user cart
- `POST /api/cart` → Add item to cart
- `PUT /api/cart/:id` → Update item quantity
- `DELETE /api/cart/:id` → Remove item from cart

---

## 🔮 Future Enhancements
- Online payment integration (Razorpay/Stripe)
- Order management system
- Product reviews & ratings
- Wishlist feature
- Admin dashboard with analytics

---

## 👨‍💻 Author
Developed by **Adarsh Bhagat** ✨  
