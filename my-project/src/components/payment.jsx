// PaymentPage.jsx
import React, { useState } from "react";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const paymentOptions = [
    { id: "COD", label: "Cash On Delivery" },
    { id: "UPI", label: "UPI (Pay via any App)" },
    { id: "CARD", label: "Credit/Debit Card" },
    { id: "PAY_IN_3", label: "Pay in 3 (New)" },
    { id: "PAY_LATER", label: "Pay Later" },
    { id: "WALLET", label: "Wallets" },
    { id: "EMI", label: "EMI" },
    { id: "NET_BANKING", label: "Net Banking" },
  ];

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-100 min-h-screen">
      {/* Left Section */}
      <div className="flex-1 space-y-6">
        {/* Bank Offer */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg mb-2">🏦 Bank Offer</h2>
          <p className="text-gray-700">
            - 10% Instant Discount on HDFC Bank Credit Card EMI on a min spend
            of ₹3,500. T&C
          </p>
          <button className="text-pink-600 font-medium mt-2">Show More</button>
        </div>

        {/* Payment Modes */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-xl mb-4">Choose Payment Mode</h2>
          <div className="space-y-4">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setPaymentMethod(option.id)}
                className={`p-4 border rounded flex justify-between items-center cursor-pointer ${
                  paymentMethod === option.id ? "border-pink-500" : ""
                }`}
              >
                <span>{option.label}</span>
                {paymentMethod === option.id && (
                  <span className="text-pink-500 font-bold">✔</span>
                )}
              </div>
            ))}
          </div>
          {paymentMethod === "COD" && (
            <div className="mt-4 p-3 text-red-500 border rounded bg-red-50">
              Pay on Delivery is not available for your shipping address
            </div>
          )}
        </div>

        {/* Gift Card */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Have a Gift Card?</h2>
          <button className="text-pink-600 font-bold">APPLY GIFT CARD</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/3 ml-0 md:ml-6 mt-6 md:mt-0">
        <div className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="font-bold text-lg">PRICE DETAILS (1 Item)</h2>
          <div className="flex justify-between">
            <span>Total MRP</span>
            <span>₹32,000</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount on MRP</span>
            <span>- ₹12,800</span>
          </div>
          <div className="flex justify-between">
            <span>Coupon Discount</span>
            <button className="text-pink-600 font-bold">Apply Coupon</button>
          </div>
          <div className="flex justify-between">
            <span>Social Work Donation</span>
            <span>₹10</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span>₹20</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t pt-2">
            <span>Total Amount</span>
            <span>₹19,230</span>
          </div>
          <button className="bg-pink-500 text-white w-full py-3 rounded font-bold text-lg hover:bg-pink-600">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
