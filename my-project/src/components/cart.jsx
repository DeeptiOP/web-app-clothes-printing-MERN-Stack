import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Classic White T-Shirt',
      size: 'L',
      color: 'White',
      design: 'Minimalist Logo',
      price: 599,
      quantity: 1,
      image: '/images/white-tshirt.png',
    },
    {
      id: 2,
      name: 'Black Graphic Tee',
      size: 'M',
      color: 'Black',
      design: 'Anime Art',
      price: 799,
      quantity: 2,
      image: '/images/black-tshirt.png',
    },
  ]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="flex flex-col gap-6">
        {cartItems.length === 0 ? (
          <p className="text-xl">Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md">
              <img src={item.image} alt={item.name} className="w-40 h-40 object-cover rounded-xl" />
              <div className="flex-1 flex flex-col gap-2 md:ml-6">
                <h2 className="text-2xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Size: {item.size} | Color: {item.color}</p>
                <p className="text-gray-600">Design: {item.design}</p>
                <p className="text-lg font-bold">₹{item.price}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700 mt-4 md:mt-0">
                <FaTrashAlt size={24} />
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-10 text-right">
          <h2 className="text-2xl font-bold">Total: ₹{getTotal()}</h2>
          <button className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
