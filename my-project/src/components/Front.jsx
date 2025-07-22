import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { Design } from "../components/Data"; // adjust the path as per your file structure
import { tshirts } from "../components/Data"; // adjust the path as per your file structure

// Images
import cover_pic from "../assets/product6.jpg";
import T_shirt from "../assets/pic4.png";
import long from "../assets/pic2.png";
import sweater from "../assets/pic3.png";
import hoodies from "../assets/pic5.png";
import tanktop from "../assets/pic6.png";
import st from "../assets/st.jpg";
import st1 from "../assets/st1.jpg";
import st5 from "../assets/st5.jpg";
import st3 from "../assets/st3.jpg";
import os3 from "../assets/os3.jpg";
import hoodie3 from "../assets/hoodie3.jpg";
import product15 from "../assets/product15.jpg";
import print1 from "../assets/print1.jpg";
import tshirt from "../assets/banner.png";
import image_5 from "../assets/banner.png";
import image_6 from "../assets/banner.png";

const Front = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalDesigns = Design.length;
  const visibleDesigns = Design.slice(0, 4);
  const remainingCount = totalDesigns - visibleDesigns.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000); // 1 minute

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-fit lg:w-max-full h-screen relative">
      <nav className="flex justify-between items-center shadow-md h-20 px-4 relative">
        <div className="text-2xl font-bold text-gray-800">
          <h2 className="text-orange-700 text-3xl">PrinTeeQ</h2>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 text-gray-700 gap-3 font-bold text-lg">
          <li className="hover:underline underline-offset-8">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:underline underline-offset-8">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="hover:underline underline-offset-8">
            <Link to="/customize">On Show</Link>
          </li>
          <li className="hover:underline underline-offset-8">New Arrivals</li>
          <li className="hover:underline underline-offset-8">Brands</li>
        </ul>

        {/* Search Bar */}
        <div className="hidden lg:flex w-auto h-10 border border-black rounded-3xl px-4 items-center gap-3">
          <IoSearchSharp size={30} />
          <input
            type="text"
            placeholder="Search the Products..."
            className="outline-none"
          />
        </div>

        {/* Cart */}
        <div className="hidden lg:block">
          <Link to="/cart">
          <FaShoppingCart size={30} />
          </Link>
        </div>

        {/* Buttons */}
        <div className="hidden lg:flex space-x-2">
          <div className="flex space-x-1">
            <Link to="/signin">
              <button className="bg-white text-blue-950 border border-blue-950 hover:bg-blue-950 hover:text-white px-3 py-2 rounded-3xl font-semibold">
                LOGIN
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white text-blue-950 border border-blue-950 hover:bg-blue-950 hover:text-white px-3 py-2 rounded-3xl font-semibold">
                SIGN UP
              </button>
            </Link>
          </div>
        </div>
        {/* Hamburger Icon */}
        <div
          className="lg:hidden flex gap-5 text-center align-middle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
          <div className="lg:block">
            <MdAccountCircle size={40} />
          </div>
        </div>

        {/* Profile Icon */}
        <div className="hidden lg:block">
          <MdAccountCircle size={40} />
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 p-5 z-50 lg:hidden">
            <Link to="/" className="font-semibold text-lg">
              Home
            </Link>
            <Link to="/shop" className="font-semibold text-lg">
              Shop
            </Link>
            <Link to="/customize" className="font-semibold text-lg">
              On Show
            </Link>
            <span className="font-semibold text-lg">New Arrivals</span>
            <span className="font-semibold text-lg">Brands</span>
            <div className="flex w-full justify-center gap-3">
              <button className="bg-white text-blue-950 border border-blue-950 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-3xl font-semibold">
                LOGIN
              </button>
              <button className="bg-white text-blue-950 border border-blue-950 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-3xl font-semibold">
                SIGN UP
              </button>
            </div>
          </div>
        )}
      </nav>

      <section className="w-full flex flex-col lg:flex-row justify-between px-5 items-center py-12 border border-zinc-700 gap-6">
        <div className="flex flex-col gap-5 items-center mx-5 font-bold text-black border-zinc-400  text-center md:text-left">
          <h3 className="text-5xl">FIND CLOTHES THAT MATCH YOUR STYLE</h3>
          <p className="text-xl font-light">
            Wear your art — bold, custom-printed dresses designed to express
            your unique style.
          </p>
          <div className="flex gap-8 rounded-3xl ">
            <Link to="/shop">
              <button
                type="button"
                className="bg-blue-950 text-white px-5 py-2 my-10 rounded-3xl hover:text-blue-950 hover:bg-white border border-blue-950 transition"
              >
                Shop Now
              </button>
            </Link>

            <Link to="/customize">
              <button
                type="button"
                className="bg-blue-950 text-white px-5 py-2 my-10 rounded-3xl hover:text-blue-950 hover:bg-white border border-blue-950 transition"
              >
                Customize Your Design
              </button>
            </Link>
          </div>

          <div className="flex  gap-10 ">
            <div className="flex flex-col align-middle items-center gap-2">
              <h2 className="text-3xl">200+</h2>
              <p className="text-gray-600">International Brands</p>
            </div>
            <div className="flex flex-col align-middle items-center gap-2">
              <h2 className="text-3xl">2,000+</h2>
              <p className="text-gray-600">High-Quality Products</p>
            </div>
            <div className="flex flex-col align-middle items-center gap-2">
              <h2 className="text-3xl">30,000</h2>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>

        <div>
          <img
            src={cover_pic}
            alt="cover"
            className="rounded-xl w-auto h-96 lg:h-[500px] mx-20 object-cover"
          />
        </div>
      </section>

      <div className="overflow-x-auto whitespace-nowrap bg-black text-white py-4">
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

      <section className="flex flex-col gap-5 my-5 ">
        <h2 className="mx-10 my-5 text-2xl font-bold">
          Shopping by Categories
        </h2>
        <ul className="flex justify-evenly mb-10">
          <li className="flex flex-col align-middle items-center gap-5">
            <Link to="/Product">
              <img
                src={T_shirt}
                alt="T-shirt"
                className="rounded-full w-25 h-25 border-2 object-cover"
              />
            </Link>

            <p className="text-lg">T-shirt</p>
          </li>
          <li className="flex flex-col align-middle items-center gap-5">
            <Link to="/Product">
              <img
                src={long}
                alt="Long-Sleeves"
                className="rounded-full w-25 h-25 border-2 object-cover"
              />
            </Link>

            <p className="text-lg">Long-Sleeves</p>
          </li>
          <li className="flex flex-col align-middle items-center gap-5">
            <Link to="/Product">
              <img
                src={sweater}
                alt="Sweater"
                className="rounded-full w-25 h-25 border-2 object-cover"
              />
            </Link>

            <p className="text-lg">Sweater</p>
          </li>
          <li className="flex flex-col align-middle items-center gap-5">
            <Link to="/Product">
              <img
                src={hoodies}
                alt="Hoodies"
                className="rounded-full w-25 h-25 border-2 object-cover"
              />
            </Link>

            <p className="text-lg">Hoodies</p>
          </li>
          <li className="flex flex-col align-middle items-center gap-5">
            <Link to="/Product">
              <img
                src={tanktop}
                alt="TankTop"
                className="rounded-full w-25 h-25 border-2 object-cover"
              />
            </Link>

            <p className="text-lg">TankTop</p>
          </li>
        </ul>
      </section>

      <section className="mx-5 md:mx-20 my-10 py-10 flex flex-row gap-10">
        {/* Section 1 */}

        <div className="flex flex-wrap lg:flex-nowrap justify-around items-center rounded-2xl border-2 px-6 py-10 gap-8">
          <div className="flex flex-col gap-6 justify-center items-center text-center mx-5 lg:items-start lg:text-left max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold">
              Thousands of Free Templates
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
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
            <h1 className="text-3xl md:text-4xl font-bold">
              Create Your Unique Style
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
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

      <section className="flex flex-col  gap-10 mx-10 rounded-lg py-5">
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
            <Link to="/Product">
              <img
                src={st}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>
          </div>
          <div>
            <Link to="/Product">
              <img
                src={st1}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>
          </div>
          <div>
            <Link to="/Product">
              {" "}
              <img
                src={st5}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>
          </div>
          <div>
            <Link to="/Product">
              <img
                src={st3}
                alt=""
                className="w-40 sm:w-52 md:w-64 h-80 md:h-96 object-cover rounded-lg"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col  gap-10 mx-10 rounded-lg py-5">
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

      <section className="rounded-lg mx-20 my-12 bg-purple-100 py-20 px-10 md:px-40">
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

      <section className="flex flex-col lg:flex-row justify-between items-start gap-10 px-5 md:px-16 py-16 bg-gray-50">
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
          <div className="bg-white p-6 rounded-xl shadow-sm">
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
          <div className="bg-white p-6 rounded-xl shadow-sm">
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
          <div className="bg-white p-6 rounded-xl shadow-sm">
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
          <div className="bg-white p-6 rounded-xl shadow-sm">
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
          <div className="bg-white p-6 rounded-xl shadow-sm">
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
          <div className="bg-white p-6 rounded-xl shadow-sm">
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

      <section className="px-5 md:px-20 py-20 bg-white">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4">
          More resources
        </h2>
        <p className="text-center text-xl text-gray-500 mb-12 max-w-xl mx-auto">
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
              <div className="flex flex-col items-center text-md text-gray-500 gap-1">
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
              <div className="flex flex-col items-center text-md gap-1 text-gray-500">
                <p className="mr-2">by admin</p>
                <p>August 20, 2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-20 py-20 bg-white relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          What People Are Saying
        </h2>
        <p className="text-center text-gray-500 mb-12">
          We provide support for more than 15K+ Businesses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <div className="flex items-center mb-4 gap-3">
              <img
                src="/avatar1.jpg"
                alt="Dean D."
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">Dean D.</h4>
                <span className="text-sm text-gray-500">Director</span>
              </div>
            </div>
            <p className="text-gray-600">
              “ Great quality products – Flags, programs for exceptional
              capacities, birthday, and occasion welcome are largely still
              mainstream on paper. ”
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <div className="flex items-center mb-4 gap-3">
              <img
                src="/avatar2.jpg"
                alt="Cristian L."
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">Cristian L.</h4>
                <span className="text-sm text-gray-500">Manager</span>
              </div>
            </div>
            <p className="text-gray-600">
              “ Best services ever – Flags, programs for exceptional capacities,
              birthday, and are largely still mainstream on paper occasion
              welcome. ”
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <div className="flex items-center mb-4 gap-3">
              <img
                src="/avatar3.jpg"
                alt="Leonel R."
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">Leonel R.</h4>
                <span className="text-sm text-gray-500">Designer</span>
              </div>
            </div>
            <p className="text-gray-600">
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

      <section className="flex justify-evenly py-5 mx-5">
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium">PrinTeeQ</h3>
          <p className="text-md text-gray-600 font-medium">
            printeeq@support.com
          </p>
          <p className="text-md text-gray-600 font-medium">7992662726</p>
          <p className="text-md text-gray-600 font-medium">
            BENGALURU,KARNATAKA
          </p>
        </div>
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium">Information</h3>
          <p className="text-md text-gray-600 font-medium">About us</p>
          <p className="text-md text-gray-600 font-medium">Our Blog</p>
          <p className="text-md text-gray-600 font-medium">Start a Return</p>
          <p className="text-md text-gray-600 font-medium">Contact Us</p>
          <p className="text-md text-gray-600 font-medium">Shipping FAQ</p>
        </div>
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium">Useful links</h3>
          <p className="text-md text-gray-600 font-medium">My Account</p>
          <p className="text-md text-gray-600 font-medium">Print Provider</p>
          <p className="text-md text-gray-600 font-medium">Become a Partner</p>
          <p className="text-md text-gray-600 font-medium">Custom Products</p>
          <p className="text-md text-gray-600 font-medium">
            Make your own shirt
          </p>
        </div>
        <div className="flex flex-col gap-4 px-3">
          <h3 className="text-2xl font-medium">Newsletter</h3>
          <p className="text-md text-gray-600 font-medium">
            Get the latest news, events and more delivered to your inbox.
          </p>
          <input
            className="h-10 px-5  rounded-lg bg-gray-400"
            type="text"
            placeholder="your e-mail address"
          />
        </div>
      </section>

      {/* ✅ Popup Overlays After 1 Minute */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-[90%] text-center space-y-6 shadow-lg">
            <h2 className="text-2xl font-bold text-black">
              Welcome to PrinTeeQ
            </h2>
            <p className="text-gray-600">
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
                className="text-red-600 underline text-sm"
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
