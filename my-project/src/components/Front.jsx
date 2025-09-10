import React, { useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./Front.css";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { Design } from "../components/Data"; // adjust the path as per your file structure
import { tshirts } from "../components/Data"; // adjust the path as per your file structure
import { TextureLoader } from 'three';
import { useAuth } from "../context/AuthContext"; // Use useAuth instead of direct import




// Images
import T_shirt from "../Assets/pic4.png";
import long from "../Assets/pic2.png";
import sweater from "../Assets/pic3.png";
import hoodies from "../Assets/pic5.png";
import tanktop from "../Assets/pic6.png";
import st from "../Assets/st.jpg";
import st1 from "../Assets/st1.jpg";
import st5 from "../Assets/st5.jpg";
import st3 from "../Assets/st3.jpg";
import os3 from "../Assets/os3.jpg";
import hoodie3 from "../Assets/hoodie3.jpg";
import product15 from "../Assets/product15.jpg";
import print1 from "../Assets/print1.jpg";
import tshirt from "../Assets/banner.png";
import image_5 from "../Assets/banner.png";
import image_6 from "../Assets/banner.png";

// 3D Model Component
function TShirtModel(props) {
  const { scene } = useGLTF("https://res.cloudinary.com/dwryce3zm/image/upload/v1754601840/Tshirt_lmx8ca.glb");
  const ref = React.useRef();
  const [color, setColor] = React.useState("#ffffff");
  const colors = ["#ffffff", "#e63946", "#457b9d", "#f1faee", "#a8dadc", "#ffbe0b", "#43aa8b", "#3a86ff"];

  // Animate color change every second
  React.useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % colors.length;
      setColor(colors[idx]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Apply color to the model
  React.useEffect(() => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(color);
        }
      });
    }
  }, [color]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[5.0, 4.5, 5.0]}
      {...props}
      style={{ cursor: "pointer" }}
    />
  );
}

const Front = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { user, isAuthenticated } = useAuth(); // Use useAuth hook instead

  // Animated counters
  const [brands, setBrands] = useState(0);
  const [products, setProducts] = useState(0);
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    // Helper for animation
    const animateValue = (setter, end, duration) => {
      let start = 0;
      const increment = end / (duration / 16);
      function step() {
        start += increment;
        if (start < end) {
          setter(Math.floor(start));
          requestAnimationFrame(step);
        } else {
          setter(end);
        }
      }
      step();
    };

    // Animate counters
    animateValue(setBrands, 50, 2000);
    animateValue(setProducts, 1000, 2500);
    animateValue(setCustomers, 10000, 3000);
  }, []);

  useEffect(() => {
    // Only show popup if user is not authenticated
    if (!user) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, [user]);
  return (
    <div className="w-fit lg:w-max-full bg-[#090138] min-h-screen text-[#c9d1d9] shadow-blue-700">

      <section className="w-full flex flex-col lg:flex-row justify-between px-20 items-center py-10 bg-[#06012f] border-b border-[#00353c] gap-10">
        <div className="flex flex-col gap-8 items-center mx-5 font-bold text-[#c9d1d9] text-center md:text-left max-w-2xl">
          <h3 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
            FIND CLOTHES THAT MATCH YOUR STYLE
          </h3>
          <p className="text-2xl font-light text-[#8b949e] max-w-xl">
            Wear your art —{" "}
            <span className="font-semibold text-[#58a6ff]">
              bold, custom-printed dresses
            </span>{" "}
            designed to express your unique style.
          </p>
          <div className="flex gap-6 mt-4">
            <Link to="/shop">
              <button
                type="button"
                className="bg-gradient-to-r from-blue-900 to-blue-600 text-white px-5 py-2 rounded-full shadow-lg hover:from-white hover:to-white hover:text-blue-900 hover:border-blue-900 border-2 border-transparent hover:border transition font-bold text-lg"
              >
                Shop Now
              </button>
            </Link>
            <Link to="/customize">
              <button
                type="button"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full shadow-lg hover:from-white hover:to-white hover:text-purple-700 hover:border-purple-700 border-2 border-transparent hover:border transition font-bold text-lg"
              >
                Customize Your Design
              </button>
            </Link>
          </div>
          <div className="w-full flex justify-center my-6">
            <div className="w-32 border-t-2 border-[#00a1b3]"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            <div className="flex-1 bg-[#161b22] rounded-2xl shadow-lg p-6 flex flex-col items-center gap-2 animate-slide-in-left hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <h2 className="text-4xl font-bold text-[#58a6ff]">
                {brands.toLocaleString()}+
              </h2>
              <p className="text-[#8b949e] font-medium">International Brands</p>
            </div>
            <div className="flex-1 bg-[#161b22] rounded-2xl shadow-lg p-6 flex flex-col items-center gap-2 animate-slide-in-up hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <h2 className="text-4xl font-bold text-pink-400">
                {products.toLocaleString()}+
              </h2>
              <p className="text-[#8b949e] font-medium">High-Quality Products</p>
            </div>
            <div className="flex-1 bg-[#161b22] rounded-2xl shadow-lg p-6 flex flex-col items-center gap-2 animate-slide-in-right hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <h2 className="text-4xl font-bold text-green-400">
                {customers.toLocaleString()}
              </h2>
              <p className="text-[#8b949e] font-medium">Happy Customers</p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full lg:w-auto">
          <Canvas 
            camera={{ position: [4, -0.5, 15], fov: 30 }} 
            style={{ width: '100%', maxWidth: '700px', height: '700px', aspectRatio: '4/5', display: 'block', background: 'transparent' }}
          >
            <ambientLight intensity={0.9} />
            <directionalLight position={[2, 2, 5]} intensity={1.2} />
            <Suspense fallback={null}>
              <group position={[-0.4, -1.5, 0]} scale={[2, 2, 2]}>
                <TShirtModel position={[0, -0.58, -0.7]} />
              </group>
            </Suspense>
            <OrbitControls enablePan={true} enableZoom={false} />
          </Canvas>
        </div>
      </section>

      <div className="overflow-x-auto whitespace-nowrap bg-[#100176]/25 text-[#c9d1d9] py-4">
        <ul className="flex justify-evenly gap-10 px-5 min-w-max text-xl lg:text-4xl">
          <li className="font-cinzel tracking-tighter uppercase font-semibold">
            VERSACE
          </li>
          <li className="font-serif italic font-semibold ">ZARA</li>
          <li className="font-serif -tracking-tighter ">GUCCI</li>
          <li className="font-serif font-extrabold tracking-normal ">PRADA</li>
          <li className="font-raleway font-light tracking-tighter ">
            Calvin Klein
          </li>
        </ul>
      </div>

      <section className="flex flex-col gap-3 my-3 bg-[#161b22] rounded-xl px-4 py-4">
        <h2 className="mx-6 my-3 text-xl font-bold text-[#c9d1d9]">
          Shopping by Categories
        </h2>
        <ul className="flex justify-evenly mb-6">
          <li className="flex flex-col align-middle items-center gap-3">
            <Link to="/Product">
              <img
                src={T_shirt}
                alt="T-shirt"
                className="rounded-full w-20 h-20 border-2 object-cover"
              />
            </Link>

            <p className="text-sm">T-shirt</p>
          </li>
          <li className="flex flex-col align-middle items-center gap-3">
            <Link to="/Product">
              <img
                src={long}
                alt="Long-Sleeves"
                className="rounded-full w-20 h-20 border-2 object-cover"
              />
            </Link>

            <p className="text-sm">Long-Sleeves</p>
          </li>
          <li className="flex flex-col align-middle items-center gap-3">
            <Link to="/Product">
              <img
                src={sweater}
                alt="Sweater"
                className="rounded-full w-20 h-20 border-2 object-cover"
              />
            </Link>

            <p className="text-sm">Oversized</p>
          </li>
          <li className="flex flex-col align-middle items-center gap-3">
            <Link to="/Product">
              <img
                src={hoodies}
                alt="Hoodies"
                className="rounded-full w-20 h-20 border-2 object-cover"
              />
            </Link>

            <p className="text-sm">Crew Neck</p>
          </li>
          <li className="flex flex-col align-middle items-center gap-3">
            <Link to="/Product">
              <img
                src={tanktop}
                alt="TankTop"
                className="rounded-full w-20 h-20 border-2 object-cover"
              />
            </Link>

            <p className="text-sm">TankTop</p>
          </li>
        </ul>
      </section>

      <section className="mx-5 md:mx-20 my-10 py-10 flex flex-row gap-10 bg-[#161b22] rounded-xl">
        {/* Section 1 */}

        <div className="flex flex-wrap lg:flex-nowrap justify-around items-center rounded-2xl border-2 px-6 py-10 gap-8">
          <div className="flex flex-col gap-6 justify-center items-center text-center mx-5 lg:items-start lg:text-left max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold text-[#c9d1d9]">
              Thousands of Free Templates
            </h1>
            <p className="text-[#8b949e] text-lg md:text-xl">
              Free and Easy way to bring your ideas to life
            </p>
            <Link to="/customize">
              <button
                type="button"
                className="px-4 py-2 bg-purple-950 text-white text-lg rounded-3xl hover:bg-purple-300 hover:text-purple-950 hover:font-bold hover:border border-purple-950"
              >
                Explore More
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {Design.slice(0, 3).map((item) => (
              <Link to="/customize" key={item.id} className="relative group">
                <img
                  src={item.image}
                  alt={`Design ${item.id}`}
                  className="w-32 h-40 object-cover rounded-lg"
                />
              </Link>
            ))}

            <Link to="/customize" className="relative">
              <img
                src={Design[4].image}
                alt="More Designs"
                className="w-32 h-40 object-cover rounded-lg brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
                +{Design.length - 4} more
              </div>
            </Link>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-wrap lg:flex-nowrap justify-around items-center  rounded-2xl border-2 px-3 py-10 gap-8">
          <div className="flex flex-col gap-6 justify-center items-center text-center mx-5 lg:items-start lg:text-left max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold text-[#c9d1d9]">
              Create Your Unique Style
            </h1>
            <p className="text-[#8b949e] text-lg md:text-xl">
              Free and Easy way to create your ideas to life
            </p>
            <Link to="/customize">
              <button
                type="button"
                className="px-4 py-2 bg-purple-950 text-white text-lg rounded-3xl hover:bg-purple-300 hover:text-purple-950 hover:font-bold hover:border border-purple-950"
              >
                Explore More
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {tshirts.slice(0, 3).map((item) => (
              <Link to="/customize" key={item.id} className="relative group">
                <img
                  src={item.image}
                  alt={`tshirts ${item.id}`}
                  className="w-32 h-40 object-cover rounded-lg"
                />
              </Link>
            ))}

            <Link to="/customize" className="relative">
              <img
                src={tshirts[4].image}
                alt="More Designs"
                className="w-32 h-40 object-cover rounded-lg brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
                +{tshirts.length - 4} more
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10 mx-10 rounded-lg py-5 bg-[#161b22]">
        <ul className="flex flex-wrap gap-7 mx-5 md:mx-28 text-xl md:text-3xl py-5 ">
          <li className="font-semibold hover:underline underline-offset-8">
            New Arrivals
          </li>
          <li className="font-semibold hover:underline underline-offset-8">
            Best Seller
          </li>
          <li className="font-semibold hover:underline underline-offset-8">
            Sale
          </li>
        </ul>

        <div className="flex flex-wrap gap-20 w-full justify-center px-5">
          <div>
            <Link to="/shop">
              <img
                src={st}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>
          </div>
          <div>
            <Link to="/shop">
              <img
                src={st1}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>
          </div>
          <div>
            <Link to="/shop">
              <img
                src={st5}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>
          </div>
          <div>
            <Link to="/shop">
              <img
                src={st3}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10 mx-10 rounded-lg py-5 bg-[#161b22]">
        <ul className="flex flex-wrap justify-between gap-5 mx-5 md:mx-20 text-xl md:text-2xl py-5">
          <li className="font-bold text-3xl ">Hot Under $39</li>
          <li>
            <Link to="/shop">
              <button type="button" className="underline font-semibold">
                View All {">"}
              </button>
            </Link>
          </li>
        </ul>

        <div className="flex flex-wrap gap-20 w-full justify-center px-5">
          <div>
            <Link to="/Product">
              <img
                src={os3}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>

            <ul className="flex flex-col items-center gap-3 mt-6 text-xl font-bold">
              <li>Adult Quantity Tee</li>
              <li>$26.00-$29.00</li>
            </ul>
          </div>
          <div>
            <Link to="/Product">
              <img
                src={hoodie3}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>

            <ul className="flex flex-col items-center gap-3 mt-6 text-xl font-bold">
              <li>All-Over-Print Hoodie</li>
              <li>$26.00-$29.00</li>
            </ul>
          </div>
          <div>
            <Link to="/Product">
              <img
                src={product15}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>

            <ul className="flex flex-col items-center gap-3 mt-6 text-xl font-bold">
              <li>AOP Cut & Sew Tee</li>
              <li>$26.00-$29.00</li>
            </ul>
          </div>
          <div>
            <Link to="/Product">
              <img
                src={print1}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>

            <ul className="flex flex-col items-center gap-3 mt-6 text-xl font-bold">
              <li>Fine Jersey Tee</li>
              <li>$26.00-$29.00</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-lg mx-20 my-12 bg-[#161b22] py-20 px-10 md:px-40 text-[#c9d1d9]">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
          How to design and order custom T-shirts
        </h2>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          {/* Left Side: Steps */}
          <div className="flex flex-col gap-8">
            {/* Step 1 */}
            <div className="flex items-start gap-5">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md">
                1
              </div>
              <p className="text-lg md:text-xl font-medium text-gray-800">
                Choose from 412 custom products in our catalog
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex items-start gap-5">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md">
                2
              </div>
              <p className="text-lg md:text-xl font-medium text-gray-800">
                Customize your design with graphics, text or your own uploaded
                images.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex items-start gap-5">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md">
                3
              </div>
              <p className="text-lg md:text-xl font-medium text-gray-800">
                Get your order sent to your door with free standard shipping.
              </p>
            </div>
          </div>

          {/* Right Side: Mockup Image */}
          <div className="relative w-full max-w-md">
            <img
              src={tshirt}
              alt="T-shirt Design"
              className="w-full rounded-2xl shadow-lg"
            />
            {/* Floating toolbar (fake icons as example) */}
            <div className="absolute top-10 right-[-40px] flex flex-col bg-green-500 rounded-xl p-2 gap-3 shadow-lg">
              <div className="bg-white p-2 rounded-md text-green-500 font-bold text-xl">
                ↻
              </div>
              <div className="bg-white p-2 rounded-md">🎨</div>
              <div className="bg-white p-2 rounded-md">T</div>
              <div className="bg-white p-2 rounded-md">🖼️</div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row justify-between items-start gap-10 px-5 md:px-16 py-16 bg-[#161b22] text-[#c9d1d9]">
        {/* Left Side */}
        <div className="max-w-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why customize products with TeeSpace?
          </h2>
          <p className="text-gray-500 mb-8">
            Lorem ipsum det, cowec tetur duis necgi det, consec t eturlagix
            adipiscing eliet duis necgi det, con
          </p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition">
            View All Features →
          </button>
        </div>

        {/* Right Side - Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-950 p-6 rounded-xl shadow-sm">
            <img
              src="/icons/no-fee.svg"
              alt=""
              className="w-8 h-8 mb-4 text-green-500"
            />
            <h3 className="font-bold text-lg mb-2">NO Die & plate charges</h3>
            <p className="text-gray-500 text-sm">
              Lorem ipsum det, cowec tetur duis necgi det, consect eturlagix
              adipiscing eliet duis necgi det, con
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-950 p-6 rounded-xl shadow-sm">
            <img
              src="/icons/printing.svg"
              alt=""
              className="w-8 h-8 mb-4 text-green-500"
            />
            <h3 className="font-bold text-lg mb-2">
              High quality offset printing
            </h3>
            <p className="text-gray-500 text-sm">
              Lorem ipsum det, cowec tetur duis necgi det, consect eturlagix
              adipiscing eliet duis necgi det, con
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-950 p-6 rounded-xl shadow-sm">
            <img
              src="/icons/payment.svg"
              alt=""
              className="w-8 h-8 mb-4 text-green-500"
            />
            <h3 className="font-bold text-lg mb-2">Secure payment</h3>
            <p className="text-gray-500 text-sm">
              Lorem ipsum det, cowec tetur duis necgi det, consect eturlagix
              adipiscing eliet duis necgi det, con
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-950 p-6 rounded-xl shadow-sm">
            <img
              src="/icons/customize.svg"
              alt=""
              className="w-8 h-8 mb-4 text-green-500"
            />
            <h3 className="font-bold text-lg mb-2">Custom size & style</h3>
            <p className="text-gray-500 text-sm">
              Lorem ipsum det, cowec tetur duis necgi det, consect eturlagix
              adipiscing eliet duis necgi det, con
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-gray-950 p-6 rounded-xl shadow-sm">
            <img
              src="/icons/delivery.svg"
              alt=""
              className="w-8 h-8 mb-4 text-green-500"
            />
            <h3 className="font-bold text-lg mb-2">Fast & free delivery</h3>
            <p className="text-gray-500 text-sm">
              Lorem ipsum det, cowec tetur duis necgi det, consect eturlagix
              adipiscing eliet duis necgi det, con
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-gray-950 p-6 rounded-xl shadow-sm">
            <img
              src="/icons/min-order.svg"
              alt=""
              className="w-8 h-8 mb-4 text-green-500"
            />
            <h3 className="font-bold text-lg mb-2">
              Low minimum order quantity
            </h3>
            <p className="text-gray-500 text-sm">
              Lorem ipsum det, cowec tetur duis necgi det, consect eturlagix
              adipiscing eliet duis necgi det, con
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-20 py-20 bg-[#161b22] text-[#c9d1d9]">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4">
          More resources
        </h2>
        <p className="text-center text-xl text-[#8b949e] mb-12 max-w-xl mx-auto">
          Lorem ipsum det, cowec tetuec tetur duis necgi duis necgi det, consec
          eturlagix adipiscing eliet, cowec tetopak
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-10">
          {/* Card 1 */}
          <div className="flex gap-8 justify-center items-center ">
            <img src={image_5} alt="" className="rounded-xl w-80 " />
            <div className="flex flex-col justify-center items-start gap-5">
              <button className="px-3 py-1 bg-gray-300 rounded-lg text-green-600">
                Design Services
              </button>
              <h2 className="text-xl font-bold">
                Make yourself happy with our T-shirt customer...
              </h2>
              <div className="flex flex-col items-center text-md text-[#8b949e] gap-1">
                <p className="mr-2">by admin</p>
                <p>August 20, 2022</p>
              </div>
            </div>
          </div>

          <div className="flex gap-8 justify-center items-center  ">
            <img src={image_6} alt="" className="rounded-xl w-80 " />
            <div className="flex flex-col justify-center items-start gap-5">
              <div className="flex gap-10">
                <button className="px-3 py-1 bg-gray-300 text-green-600 rounded-lg">
                  Print Company
                </button>
                <button className="px-3 py-1 bg-gray-300 text-green-600 rounded-lg">
                  Print Shop
                </button>
              </div>
              <h2 className="text-xl font-bold">
                Are you ready to make it awesome with us
              </h2>
              <div className="flex flex-col items-center text-md gap-1 text-[#8b949e]">
                <p className="mr-2">by admin</p>
                <p>August 20, 2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-20 py-20 bg-[#161b22] text-[#c9d1d9] relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          What People Are Saying
        </h2>
        <p className="text-center text-[#8b949e] mb-12">
          We provide support for more than 15K+ Businesses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-gray-950 p-6 rounded-xl shadow border border-gray-800">
            <div className="flex items-center mb-4 gap-3">
              <img
                src=''
                alt="Dean D."
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">Dean D.</h4>
                <span className="text-sm text-[#8b949e]">Director</span>
              </div>
            </div>
            <p className="text-[#8b949e]">
              “ Great quality products – Flags, programs for exceptional
              capacities, birthday, and occasion welcome are largely still
              mainstream on paper. ”
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-950 p-6 rounded-xl shadow border border-gray-800">
            <div className="flex items-center mb-4 gap-3">
              <img
                src=""
                alt="Cristian L."
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">Cristian L.</h4>
                <span className="text-sm text-[#8b949e]">Manager</span>
              </div>
            </div>
            <p className="text-[#8b949e]">
              “ Best services ever – Flags, programs for exceptional capacities,
              birthday, and are largely still mainstream on paper occasion
              welcome. ”
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-gray-950 p-6 rounded-xl shadow border border-gray-800">
            <div className="flex items-center mb-4 gap-3">
              <img
                src=""
                alt="Leonel R."
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">Leonel R.</h4>
                <span className="text-sm text-[#8b949e]">Designer</span>
              </div>
            </div>
            <p className="text-[#8b949e]">
              “ Top notch support – Flags, programs for birthday, and occasion
              welcome are largely still mainstream on paper exceptional
              capacities. ”
            </p>
          </div>
        </div>

        {/* Optional: Pagination Dots */}
        <div className="flex justify-center mt-10 space-x-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-black rounded-full"></div>
        </div>
      </section>

      <section className="flex justify-evenly py-5 bg-[#0d1117] border-t border-[#21262d] text-[#8b949e]">
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium">PrinTeeQ</h3>
          <p className="text-md text-[#8b949e] font-medium">
            printeeq@support.com
          </p>
          <p className="text-md text-[#8b949e] font-medium">7992662726</p>
          <p className="text-md text-[#8b949e] font-medium">
            BENGALURU,KARNATAKA
          </p>
        </div>
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium">Information</h3>
          <p className="text-md text-[#8b949e] font-medium">About us</p>
          <p className="text-md text-[#8b949e] font-medium">Our Blog</p>
          <p className="text-md text-[#8b949e] font-medium">Start a Return</p>
          <p className="text-md text-[#8b949e] font-medium">Contact Us</p>
          <p className="text-md text-[#8b949e] font-medium">Shipping FAQ</p>
        </div>
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium">Useful links</h3>
          <p className="text-md text-[#8b949e] font-medium">My Account</p>
          <p className="text-md text-[#8b949e] font-medium">Print Provider</p>
          <p className="text-md text-[#8b949e] font-medium">Become a Partner</p>
          <p className="text-md text-[#8b949e] font-medium">Custom Products</p>
          <p className="text-md text-[#8b949e] font-medium">
            Make your own shirt
          </p>
        </div>
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium">Newsletter</h3>
          <p className="text-md text-[#8b949e] font-medium">
            Get the latest news, events and more delivered to your inbox.
          </p>
          <input
            className="h-10 px-5 rounded-lg bg-[#161b22] text-[#c9d1d9] placeholder:text-[#8b949e]"
            type="text"
            placeholder="your e-mail address"
          />
        </div>
      </section>

      {/* Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-[#161b22] rounded-xl p-8 max-w-md w-[90%] text-center space-y-6 shadow-lg border border-[#30363d]">
            <h2 className="text-2xl font-bold text-[#c9d1d9]">
              Welcome to PrinTeeQ
            </h2>
            <p className="text-[#8b949e]">
              Sign up now and get exclusive discounts on your first order!
            </p>
            <div className="flex flex-col space-y-4">
              <Link to="/signup">
                <button className="bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 w-full">
                  Sign Up
                </button>
              </Link>
              <button
                onClick={() => setShowPopup(false)}
                className="text-red-400 underline text-sm"
              >
                Continue without Signup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Front;
