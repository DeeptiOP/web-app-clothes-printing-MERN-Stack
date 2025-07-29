👕 PrinTeeQ - Custom Clothes Printing Web App
---
PrinTeeQ is a full-stack web application that allows users to customize, preview, and order printed clothing online. It offers a seamless experience for customers and administrators alike, with powerful backend support for managing products, users, and orders.

🔗 Live Demo: https://deeptiop.github.io/web-app-clothes-printing-MERN-Stack/

📦 GitHub Repo: https://github.com/DeeptiOP/web-app-clothes-printing-MERN-Stack/tree/main

📁 Project Structure
```
Copy code
PrinTeeQ/
├── backend/              # Node.js + Express backend
│   ├── config/           # MongoDB configuration
│   ├── middleware/       # Auth & error handlers
│   ├── models/           # Mongoose models (User, Product, Cart, Order)
│   ├── routes/           # API routes
│   ├── scripts/          # DB seeding scripts
│   ├── .env              # Environment variables
│   ├── package.json
│   ├── server.js         # App entry point
│   ├── README.md
│   ├── BACKEND_SETUP_GUIDE.md
│   └── TESTING_GUIDE.md
├── my-project/           # React frontend (Vite + Tailwind CSS)
│   ├── public/           # Static files
│   ├── src/
│   │   ├── assets/       # Images and icons
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page views
│   │   ├── context/      # React context (auth, cart)
│   │   ├── api/          # Axios API utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── db.json
│   ├── index.html
│   ├── eslint.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── .gitignore
│   └── README.md
├── README.md             # Root README

```
1. 📌 Introduction
---
1.1 Purpose
PrinTeeQ enables customers to personalize and order custom-printed clothing directly through an easy-to-use web interface. Admins can manage inventory, users, and orders via a secure dashboard.

1.2 Scope
User Module: Browse, upload designs, place orders, and track them.

Admin Module: Full CRUD control for products, users, and orders.

Key integrations:

🧾 Stripe for payments

☁️ Cloudinary for image upload & rendering

🌐 Vercel (frontend) + Render (backend) deployment

1.3 Intended Audience
Business Stakeholders

Developers & Maintainers

QA & Testers

End Users (Customers & Admins)

2. 📦 Overall Description
---
2.1 Product Perspective
Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), PrinTeeQ leverages RESTful APIs and integrates with third-party services.

2.2 Product Functions
🔐 JWT-based user authentication

🛒 Product browsing with filters

🎨 Upload custom designs

👕 Live preview on apparel

💳 Stripe-based checkout

📦 Order tracking & history

🛠 Admin dashboard with analytics

📱 Responsive UI for all devices

2.3 User Roles
Role	Capabilities
Customer	Browse, upload, purchase, track
Admin	Manage users, orders, products

2.4 Dependencies
MongoDB Atlas

Stripe

Cloudinary

Internet Access

Modern browsers (Chrome, Edge, Firefox)

3. ✨ Features
---
3.1 User Features
Feature	Description
Registration/Login	JWT-based user sessions
Product Catalog	Filtered browsing by category/size/type
Design Upload	Upload personal designs
Live Preview	Real-time design mockup using Cloudinary
Cart Management	Add, remove, update items in cart
Checkout	Secure payments via Stripe
Order Tracking	Real-time order status
Profile Management	Update user info and view past orders

3.2 Admin Features
Feature	Description
Product Management	Add/edit/remove apparel and templates
Order Management	View, update, process customer orders
User Management	View user base and activity
Dashboard Analytics	Visual stats for revenue, orders, and users

4. 🌐 External Interfaces
---
4.1 User Interfaces
Frontend: React.js with Tailwind CSS

Admin Panel: Charts + CRUD management views

4.2 Hardware Interfaces
Hosted on cloud platforms, no hardware dependencies

4.3 Software Interfaces
Service	Purpose
MongoDB	Data storage
Cloudinary	Image uploads & transformations
Stripe	Secure online payments

4.4 Communication
Secure communication via HTTPS

Client-server via RESTful APIs

5. 🏗️ System Architecture
---
Copy 

```
PrinTeeQ/
├── backend/
│   ├── config/          → DB connection
│   ├── middleware/      → Auth & error handling
│   ├── models/          → Mongoose schemas
│   ├── routes/          → API endpoints
│   ├── scripts/         → Seeder script
│   └── server.js        → Express app entry
├── my-project/
│   ├── public/          → Static files
│   ├── src/
│   │   ├── assets/      → Images and icons
│   │   ├── components/  → UI components
│   │   ├── pages/       → Screens/pages
│   │   ├── context/     → Context (auth, cart)
│   │   └── api/         → API communication

```
6. ✅ Non-Functional Requirements
---
6.1 Performance
React UI loads in under 3 seconds

Backend API responds within 500ms under load

6.2 Security
JWT authentication

Passwords hashed with bcrypt

Enforced HTTPS & CORS

Input sanitization for all forms

6.3 Usability
Clean, modern interface

Fully responsive (mobile, tablet, desktop)

6.4 Availability
Target uptime: 99.9%

Hosted on Vercel (frontend) and Render (backend)

7. 🧪 Testing
---
✅ Unit tests for user, product, and order logic

✅ Integration tests for API endpoints

✅ Manual UI tests (Chrome, Edge, Firefox)

✅ Test .env environment setup

✅ Admin & customer test accounts

8. 📚 Appendix
---
8.1 Technologies
Layer	Tech Stack
Frontend	React.js, Vite, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB Atlas
Payments	Stripe
Image Host	Cloudinary
Deployment	Vercel (Frontend), Render (Backend)

8.2 GitHub Repository
🔗 https://github.com/DeeptiOP/web-app-clothes-printing-MERN-Stack
