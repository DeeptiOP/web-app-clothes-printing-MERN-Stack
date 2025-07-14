import React from "react";
import search_icon from "../assets/search.png";
import cart_icon from "../assets/cart.png";
import user_icon from "../assets/user.png";
import image from "../assets/cover_pic.png";
import { Link } from "react-router-dom";

const Product = () => {
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
            <Link to="/Product">Shop</Link>
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

      <section className="py-12 px-4 lg:px-20 flex flex-col lg:flex-row gap-10">
        {/* Left Image Section */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          {/* Main Product Image */}
          <div className="relative w-full h-[400px] lg:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={image}
              alt="product"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                Sale!
              </span>
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-md">
                New
              </span>
            </div>
          </div>
          {/* Thumbnail Images */}
          {/* <div className="flex gap-3">
            {[thumb1, thumb2, thumb3, thumb4].map((thumb, idx) => (
              <img
                key={idx}
                src={thumb}
                alt=""
                className="w-20 h-20 border rounded-md object-cover cursor-pointer"
              />
            ))}
          </div> */}
        </div>

        {/* Right Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">$26.00 - $29.00</span>
            <span className="text-gray-500 text-sm">&lt; PREV NEXT &gt;</span>
          </div>
          <h1 className="text-3xl font-bold">Pullover Hoodie Sweatshirt</h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            tristique malesuada elit, ut facilisis tellus elementum id.
          </p>

          {/* Product Guide */}
          <p className="font-semibold underline text-sm cursor-pointer">
            Product Guide
          </p>

          {/* Colors */}
          <div className="flex items-center gap-3">
            <span className="font-medium">Color:</span>
            {["black", "red", "peachpuff", "yellow", "white"].map(
              (color, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-6 rounded-full border cursor-pointer`}
                  style={{ backgroundColor: color }}
                ></div>
              )
            )}
          </div>

          {/* Sizes */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium">Size:</span>
            {["2XL", "3XL", "L", "M", "S", "XL", "XS"].map((size) => (
              <button
                key={size}
                className="px-3 py-1 border rounded-md hover:bg-gray-200"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Material */}
          {/* <div className="flex flex-col gap-2">
            <p className="font-medium">Material: METAL</p>
            <div className="flex gap-3">
              {[material1, material2, material3, material4].map((mat, idx) => (
                <img
                  key={idx}
                  src={mat}
                  alt="material"
                  className="w-20 h-20 rounded-md border object-cover"
                />
              ))}
            </div>
          </div> */}

          {/* Delivery */}
          <div>
            <p className="font-medium">
              Delivery: <span className="font-bold">1 TO 3 BUSINESS DAYS</span>
            </p>
            <select className="border rounded-md p-2 mt-2 w-full">
              <option>1 to 3 business days</option>
              <option>3 to 8 business days</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 text-xl font-bold">
            <span className="text-green-500">$27.00</span>
            <span className="line-through text-gray-400 text-lg">$34.00</span>
          </div>

          {/* File Upload */}
          <div className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center">
            <p>
              Drag & Drop Files Here or{" "}
              <button className="text-blue-500 font-semibold">
                Browse Files
              </button>
            </p>
          </div>

          {/* Cart Options */}
          <div className="flex gap-4 items-center">
            <div className="flex border rounded-md overflow-hidden">
              <button className="px-3 font-bold">-</button>
              <input
                type="number"
                defaultValue={1}
                className="w-12 text-center border-l border-r"
              />
              <button className="px-3 font-bold">+</button>
            </div>
            <button className="flex-1 bg-green-500 text-white py-3 rounded-md font-semibold">
              Add To Cart
            </button>
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
