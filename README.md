# prinTeeQ Project Structure

This project is organized into **backend** and **my-project** (frontend) directories, each containing relevant source files and folders.

```
PrinTeeQ/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── users.js
│   ├── scripts/
│   │   └── seedData.js
│   ├── .env
│   ├── BACKEND_SETUP_GUIDE.md
│   ├── package.json
│   ├── README.md
│   ├── server.js
│   └── TESTING_GUIDE.md
├── my-project/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   ├── db.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── playground-1.mongodb.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
```

## Backend

- **config/**: Database connection configuration.
- **middleware/**: Express middleware (auth, error handling).
- **models/**: Mongoose schemas for User, Product, Cart, Order.
- **routes/**: API route definitions.
- **scripts/**: Utility scripts (e.g., seed data).
- **server.js**: Entry point for the backend server.

## Frontend (`my-project/`)

- **public/**: Static files.
- **src/**: Main source directory.
  - **assets/**: Images and static assets.
  - **components/**: Reusable React components.
  - **pages/**: Page-level React components.
  - **context/**: React context providers.
  - **api/**: API service and config files.
  - **App.jsx**: Main app component.
  - **main.jsx**: React entry point.
- **tailwind.config.js**: Tailwind CSS configuration.
- **vite.config.js**: Vite build configuration.

---
*Update this structure as your project grows to help contributors and maintainers understand the layout and organization!*# PrinTeeQ - Dynamic Web App for Custom Clothes Printing

PrinTeeQ is a modern e-commerce platform designed for custom clothes printing businesses. It empowers users to select apparel, upload personal designs, preview mockups, and place orders with ease. The admin dashboard streamlines inventory management, order oversight, and status updates.

---

## 🛠 Tech Stack

- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT (JSON Web Tokens)
- **Image Storage:** Cloudinary
- **Payments:** Stripe
- **Deployment:** Vercel (frontend), Render (backend)

---

## 🚀 Key Features

### For Users
- **Browse & Select Apparel:** Find your style with various sizes, colors, and types.
- **Custom Design Uploads:** Easily upload your artwork or logo.
- **Real-time Mockup Preview:** Instantly see your design on apparel before ordering.
- **Shopping Cart & Secure Checkout:** Add items to cart and pay safely via Stripe.
- **Order Tracking & History:** Follow your order status and view past purchases.
- **Profile Management:** Update personal details and manage your account.

### For Admin
- **Inventory Management:** Add, edit, or remove products and variants.
- **Order Oversight:** View, update status, and process orders efficiently.
- **User Management:** Monitor customer activity and resolve issues.

---

## 📅 Development Timeline

### Week 1: Foundation & Authentication
- Initialize React frontend and Node/Express backend.
- Set up JWT-powered user authentication.
- Design flexible product models (variants: size, color, type).

### Week 2: Product Experience & Cart
- Create product listing and detailed product pages.
- Integrate Cloudinary for design uploads and mockup previews.
- Develop shopping cart and checkout system.

### Week 3: Payments & Admin Control
- Embed Stripe payment gateway for secure transactions.
- Build a robust Admin dashboard for managing products and orders.

### Week 4: User Engagement & Deployment
- Implement real-time order tracking for users.
- Add user profile and order history pages.
- Deploy frontend on Vercel, backend on Render, and database on MongoDB Atlas.

---
# printteeq Project Structure

This project is organized into **backend** and **frontend** directories, each containing relevant source files and folders.

```
prinTeeQ/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── tailwind.config.js
```

## Backend

- **controllers/**: Contains route handler logic.
- **models/**: Database models and schemas.
- **routes/**: API route definitions.
- **middleware/**: Express middleware functions.
- **utils/**: Utility/helper functions.
- **server.js**: Entry point for the backend server.

## Frontend

- **public/**: Static files.
- **src/**: Main source directory.
  - **assets/**: Images and other static assets.
  - **components/**: Reusable React components.
  - **pages/**: Page-level React components.
  - **context/**: React context providers.
  - **App.jsx**: Main app component.
  - **main.jsx**: React entry point.
- **tailwind.config.js**: Tailwind CSS configuration file.

---
*Update this structure as your project grows to help contributors and maintainers understand the layout and organization!*
---

## 💡 How to Get Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DeeptiOP/web-app-clothes-printing-MERN-Stack.git
   cd web-app-clothes-printing-MERN-Stack
   ```

2. **Install dependencies:**
   - Backend: `cd server && npm install`
   - Frontend: `cd client && npm install`

3. **Configure environment variables:**
   - Add `.env` files for both client and server (see `.env.example`).

4. **Run development servers:**
   - Backend: `cd server && npm run dev`
   - Frontend: `cd client && npm start`

5. **Access the app:**  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

We welcome contributions! Please fork, create a feature branch, and submit a pull request.

---

## 📄 License

MIT License

---

## 🙏 Acknowledgements

- MERN Stack Community  
- Cloudinary & Stripe Documentation  
- Open Source Contributors
