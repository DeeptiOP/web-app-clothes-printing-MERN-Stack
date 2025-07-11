👕 PrintTeeQ – Your Trendy Custom Apparel Destination

PrintTeeQ is a modern, full-stack e-commerce platform built to let users design and order personalized apparel. From uploading custom artwork to seeing it on live product mockups, PrintTeeQ makes it easy to create and shop uniquely styled wear.

Built with the powerfull MERN stack, Cloudinary for media uploads, Stripe for payments, and deployed via Vercel and Render.


---

🌐 Live Preview 

Frontend: Coming Soon...

Backend: Coming Soon...



---

✨ Features

🛍️ Customer Interface

Secure JWT Authentication (Register/Login)

Browse customizable clothing with size, color, and type filters

Upload your own design using Cloudinary

Preview designs in real-time on mockup models

Add to cart, checkout, and pay using Stripe

Track orders and view purchase history

Manage profile settings


🧑‍💼 Admin Dashboard

View summary on dashboard

Add/Edit/Delete products

Access and update user orders

Manage order statuses (e.g., pending, shipped, delivered)



---

⚙️ Tech Stack

FRONTEND
__________

React.js

Tailwind CSS

React Router DOM


BACKEND 
__________

Node.js + Express

MongoDB Atlas

Cloudinary

Stripe API

JWT for Authentication



---

🗂 Project Structure

printteeq/
├── client/              
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── ...
├── server/              
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── .env
└── README.md


---

🚀 Getting Started

1️⃣ Clone the Repository

git clone https://github.com/DeeptiOP/printteeq.git
cd printteeq

2️⃣ Setup Backend

cd server
npm install
cp .env.example .env   # then add your actual keys
npm start

3️⃣ Setup Frontend

cd ../client
npm install
npm run dev

Then visit: http://localhost:5173


---

🔐 Environment Variables

Create a .env file inside the server/ folder with this format:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/printteeq
CLOUDINARY_CLOUD_NAME=yourCloudName
CLOUDINARY_API_KEY=yourAPIKey
CLOUDINARY_API_SECRET=yourAPISecret
STRIPE_SECRET_KEY=yourStripeSecretKey
CLIENT_URL=http://localhost:5173
NODE_ENV=development
JWT_SECRET=yourJWTSecret

> Add .env to .gitignore to keep it secure.




---

🌍 Deployment Stack

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas



---

🧭 Roadmap

Week	Tasks

Week 1	:- Set up frontend & backend boilerplates, JWT authentication.

Week 2	:- Product models, listing pages, Cloudinary upload with preview.

Week 3	:- Cart, checkout, Stripe payment gateway.

Week 4 :- Admin tools, order tracking, user profile, testing & deploy.



---

👥 Contributors

👩‍💻 @DeeptiOP – Stack Developer

🧠 @Biswapriti – Frontend Developer

⚙️ @chrisden24 – Backend Developer

🛍️ @Tushargupta-08 – UI/UX & Cart Integration

📦 @VankiripalliAfroj – Admin & Order Management
