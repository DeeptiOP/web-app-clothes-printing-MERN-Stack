import React from 'react';
import { useWishlist } from './WishlistContext.jsx';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="text-gray-500 text-lg mt-10">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {wishlist.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              {/* Show customized T-shirt image if available, else fallback */}
              {item.tshirtImage ? (
                <img src={item.tshirtImage} alt={item.tshirtColor + ' T-shirt'} className="w-32 h-32 object-cover rounded-lg mb-2" />
              ) : (
                item.image && <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg mb-2" />
              )}
              {/* Show customized design image if available, else fallback */}
              {item.designImage ? (
                <img src={item.designImage} alt="Design" className="w-16 h-16 object-cover rounded mb-2 border" />
              ) : (
                item.design && <img src={item.design} alt="Design" className="w-16 h-16 object-cover rounded mb-2 border" />
              )}
              {/* Show details for customizer items */}
              {item.tshirtColor ? (
                <div className="font-bold text-lg text-gray-800 mb-1">{item.tshirtColor} T-shirt</div>
              ) : (
                <div className="font-bold text-lg text-gray-800 mb-1">{item.name}</div>
              )}
              <div className="text-orange-600 font-semibold mb-2">₹{item.price}</div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600" onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
