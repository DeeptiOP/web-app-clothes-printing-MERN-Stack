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

Project Title: PrinTeeQ - Custom Clothes Printing Web App
1. Introduction
1.1 Purpose
PrinTeeQ is an interactive web application that allows users to customize, preview, and order printed clothing online. It provides a seamless experience for both customers and administrators, with a powerful backend for inventory, order, and user management.

1.2 Scope
This project consists of two main modules:

User Module: Browse products, upload designs, place orders, and track them.

Admin Module: Manage products, users, and orders via a secure dashboard.

PrinTeeQ offers a real-time preview of custom designs on clothing, integrates with Stripe for payments, and uses Cloudinary for image handling. It's deployed via Vercel (frontend) and Render (backend).

1.3 Intended Audience
Business stakeholders

Developers and maintainers

QA and testing team

End users (customers and admin)

2. Overall Description
2.1 Product Perspective
PrinTeeQ is a web-based e-commerce system built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It includes integration with third-party APIs for design uploads and payments.

2.2 Product Functions
User registration & login with JWT auth

Product browsing with filters

Design upload & preview on clothing

Cart management and checkout

Order tracking and history

Admin dashboard with full CRUD

Responsive UI for all devices

2.3 User Classes and Characteristics
Customers: End-users who browse and order printed apparel.

Admins: Business managers with privileges to manage inventory, orders, and users.

2.4 Assumptions and Dependencies
MongoDB Atlas is used for data storage

Cloudinary is used for design uploads

Stripe is used for secure payments

Internet connection required

Browsers: Chrome, Edge, Firefox (modern versions)

3. System Features
3.1 User Features
Feature	Description
Registration/Login	JWT authentication with secure user sessions
Product Catalog	Browse by categories, sizes, and types
Design Upload	Upload personal artwork for printing
Live Mockup Preview	Preview design on apparel using Cloudinary
Shopping Cart	Add/edit/remove items with quantity controls
Checkout & Payments	Stripe-powered secure payment gateway
Order Tracking	See live status updates on placed orders
Profile Management	Edit account details and view order history

3.2 Admin Features
Feature	Description
Product Management	Add, edit, delete apparel and design templates
Order Management	View, process, and update order statuses
User Management	View customer list and account activity
Dashboard Analytics	Overview of orders, revenue, and active users

4. External Interface Requirements
4.1 User Interfaces
React + Tailwind CSS based responsive UI

Admin dashboard with charts and management panels

4.2 Hardware Interfaces
Runs on standard web servers

No specific hardware dependency

4.3 Software Interfaces
Service	Purpose
MongoDB	Data storage for all modules
Cloudinary	Image uploads and management
Stripe	Secure payment processing

4.4 Communications Interfaces
HTTPS for secure communication

RESTful APIs for client-server communication

5. System Architecture
pgsql
Copy code
```
PrinTeeQ/
├── backend/
│   ├── config/          → DB connection
│   ├── middleware/      → Auth & error handling
│   ├── models/          → Mongoose schemas (User, Product, Cart, Order)
│   ├── routes/          → API endpoints
│   ├── scripts/         → Seeder
│   └── server.js        → Entry point
├── my-project/ (frontend)
│   ├── public/          → Static files
│   ├── src/
│   │   ├── assets/      → Images and icons
│   │   ├── components/  → Reusable UI
│   │   ├── pages/       → Screens/pages
│   │   ├── context/     → React context (auth, cart)
│   │   └── api/         → API utilities
```
7. Non-Functional Requirements
6.1 Performance Requirements
React UI loads within 3 seconds

Backend API responses < 500ms under load

6.2 Security
JWT-based authentication

Passwords hashed using bcrypt

HTTPS enforced

CORS and input sanitization implemented

6.3 Usability
Clean, intuitive UI

Fully responsive on mobile and desktop

6.4 Availability
99.9% uptime expected (hosted on Vercel and Render)

7. Testing Requirements
Unit tests for key backend services (users, orders, products)

Integration tests for API endpoints

Manual UI testing across browsers

Test accounts for users and admins

Separate testing and production .env files

8. Appendix
8.1 Technologies
Frontend: React.js, Tailwind CSS, Vite

Backend: Node.js, Express.js

Database: MongoDB Atlas

Payments: Stripe

Image Hosting: Cloudinary

Deployment: Vercel (frontend), Render (backend)

8.2 GitHub Repo
https://github.com/DeeptiOP/web-app-clothes-printing-MERN-Stack
