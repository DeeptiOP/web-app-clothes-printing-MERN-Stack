import { useState, useEffect } from "react";

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Dummy data (replace with API later)
    setProfile({
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      avatar: "https://i.pravatar.cc/100?img=3",
    });

    setAddresses([
      { id: 1, label: "Home", address: "123 Main St, NY" },
      { id: 2, label: "Office", address: "456 Tech Park, CA" },
    ]);

    setOrders([
      { id: 1, product: "Black T-shirt", date: "2025-07-10", status: "Delivered" },
      { id: 2, product: "Custom Hoodie", date: "2025-07-15", status: "Shipped" },
    ]);

    setWishlist([
      { id: 1, name: "Cool Graphic Tee" },
      { id: 2, name: "Minimalist Hoodie" },
    ]);
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center gap-4">
              <img
                src={profile.avatar || "https://i.pravatar.cc/100"}
                alt="Avatar"
                className="w-16 h-16 rounded-full border"
              />
              <input
                type="text"
                name="avatar"
                value={profile.avatar}
                onChange={handleProfileChange}
                placeholder="Avatar URL"
                className="w-full border p-2 rounded"
              />
            </div>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Full Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="Email"
              className="w-full border p-2 rounded"
            />
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              placeholder="Phone"
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Save Profile
            </button>
          </form>
        );

      case "address":
        return (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="p-4 border rounded shadow-sm bg-white">
                <h4 className="font-semibold">{addr.label}</h4>
                <p>{addr.address}</p>
              </div>
            ))}
          </div>
        );

      case "orders":
        return (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 border rounded shadow-sm bg-white">
                <p><strong>Product:</strong> {order.product}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>
            ))}
          </div>
        );

      case "wishlist":
        return (
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div key={item.id} className="p-4 border rounded shadow-sm bg-white">
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6 border-b">
        {["profile", "address", "orders", "wishlist"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-4 py-2 -mb-px ${
              activeTab === tab
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600"
            }`}
          >
            {tab === "profile"
              ? "Edit Profile"
              : tab === "address"
              ? "Saved Addresses"
              : tab === "orders"
              ? "Order History"
              : "Wishlist"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-gray-50 p-6 rounded-lg shadow">{renderTab()}</div>
    </div>
  );
}
