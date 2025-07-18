import React from "react";
import { useParams, Link } from "react-router-dom";
import search_icon from "../assets/search.png";
import cart_icon from "../assets/cart.png";
import user_icon from "../assets/user.png";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import product5 from "../assets/product5.jpg";
import product6 from "../assets/product6.jpg";
import product7 from "../assets/product7.jpg";
import product8 from "../assets/product8.jpg";
import product9 from "../assets/product9.jpg";

const productImages = [product1, product2, product3, product4, product5, product6, product7, product8, product9];
const productNames = [
  "Adult Quantity Tee", "All-Over-Print Hoodie", "AOP Cut & Sew Tee",
  "Fine Jersey Tee", "Fit Round-neck T-shirt", "Hooded Sweatshirt",
  "Kids Hoodie", "Lightweight Fashion Tee", "Midweight Cotton Tee"
];
const productPrices = ["$20", "$25", "$28", "$30", "$22", "$26", "$24", "$27", "$29"];

const Product = () => {
  const { id } = useParams();
  const index = parseInt(id, 10) - 1;

  if (index < 0 || index >= productImages.length) {
    return (
      <div className="text-center py-20 text-2xl font-bold text-red-500">
        Product Not Found
      </div>
    );
  }
  return (
    <div>
      <nav className="flex justify-around items-center bg-blue-100 shadow-md h-20 space-x-5 ">
        <div className="text-2xl font-bold text-gray-800">
          <h2 className="text-blue-600 text-3xl">PrinTeeQ </h2>
        </div>
        <ul className="hidden lg:flex space-x-4 text-gray-700 gap-3 font-bold text-lg">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>On Show</li>
          <li>New Arrivals</li>
          <li>Brands</li>
        </ul>
        <div className="w-full lg:w-auto h-10 flex border border-gray-300 rounded-lg px-4 items-center gap-3 mt-2 md:mt-0">
          <img src={search_icon} alt="Search Icon" className="w-8 h-8 " />
          <input type="text" placeholder="Search the Products..." />
        </div>
        <div>
          <img src={cart_icon} alt="Cart Icon" className="w-10 h-10 " />
        </div>
        <div>
          <img src={user_icon} alt="User Icon" className="w-12 h-10" />
        </div>
      </nav>

      {/* Product Section */}
      <section className="py-12 px-5 lg:px-20 flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="relative h-[400px] lg:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
            <img src={productImages[index]} alt={productNames[index]} className="w-full h-full object-cover"/>
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">Sale!</span>
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-md">New</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">{productPrices[index]}</span>
            <span className="text-gray-500 text-sm">&lt; PREV NEXT &gt;</span>
          </div>
          <h1 className="text-3xl font-bold">{productNames[index]}</h1>
          <p className="text-gray-500">High-quality {productNames[index]} designed for your comfort and style.</p>

          {/* Colors */}
          <div className="flex gap-2 items-center">
            <span className="font-medium">Color:</span>
            {["black", "red", "peachpuff", "yellow", "white"].map((color, idx) => (
              <div key={idx} className="w-6 h-6 rounded-full border" style={{ backgroundColor: color }}></div>
            ))}
          </div>

          {/* Sizes */}
          <div className="flex gap-2 items-center flex-wrap">
            <span className="font-medium">Size:</span>
            {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map(size => (
              <button key={size} className="px-3 py-1 border rounded-md hover:bg-gray-100">{size}</button>
            ))}
          </div>

          {/* Delivery */}
          <div>
            <p className="font-medium">Delivery: <span className="font-bold">1 TO 3 BUSINESS DAYS</span></p>
            <select className="border rounded-md p-2 mt-2 w-full">
              <option>1 to 3 days</option>
              <option>3 to 8 days</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="flex gap-4 items-center">
            <div className="flex border rounded-md overflow-hidden">
              <button className="px-3 font-bold">-</button>
              <input type="number" defaultValue={1} className="w-12 text-center border-l border-r" />
              <button className="px-3 font-bold">+</button>
            </div>
            <button className="flex-1 bg-green-500 text-white py-3 rounded-md font-semibold">Add To Cart</button>
          </div>

          <div className="flex gap-4 text-gray-600">
            <button className="flex items-center gap-1">
              <span>☆</span> Add to wishlist
            </button>
            <button className="flex items-center gap-1">
              <span>⇄</span> Compare
            </button>
          </div>
        </div>
      </section>

      <section className="w-full px-5 py-10 border-b">
        <div className="flex justify-center gap-8 font-semibold border-b mb-10 text-lg">
          <button className="pb-2 border-b-2 border-black">Description</button>
          <button className="pb-2 text-gray-500">Additional information</button>
          <button className="pb-2 text-gray-500">Reviews (0)</button>
          <button className="pb-2 text-gray-500">Vendor Info</button>
          <button className="pb-2 text-gray-500">More Products</button>
        </div>

        <div className="flex px-64 justify-center gap-20 text-gray-700">
          <div>
            <h3 className="text-lg font-bold mb-3">
              CONSECTETUR A SCELERISQUE
            </h3>
            <p className="mb-3 text-sm">
              Sed risus neque, sagittis sed pellentesque at, pharetra ut nunc.
              Phasellus id enim eget ante pellentesque pharetra. Integer nisl
              dui, efficitur in vopat sodales, tempor sed orci.
            </p>
            <p className="text-sm">Etiam tincidunt dictum eros at porta.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">IN PHARETRA TURPIS</h3>
            <p className="mb-3 text-sm">
              Built around a solid beech frame with legs in polished stainless
              steel.
            </p>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>In pharetra turpis: 65.00 cm</li>
              <li>Aenean pulvinar lorem: 48 colors</li>
              <li>Vestibulum convallis: 2.53 m2</li>
              <li>Esticotine convallis: 8.96 m</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">PELLENTESQUE NEC</h3>
            <ul className="list-disc ml-5 text-sm space-y-1 mb-3">
              <li>Sed risus: pharetra ut nunc</li>
              <li>Phasellus id: enim eget ante</li>
              <li>Integer nisl: euismod ipsum</li>
              <li>Interdum: malesuada fames ac ante</li>
            </ul>
            <h3 className="text-lg font-bold mb-3">ETIAM NON AUGUE</h3>
            <p className="text-sm">Nullam id pires: 68.00 cm</p>
            <p className="text-sm">Etiam non augue: 86.00 cm</p>
          </div>
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
    </div>
  );
};

export default Product;
