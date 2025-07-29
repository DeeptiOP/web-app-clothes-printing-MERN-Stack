import React, { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';

const initialProducts = [
  { id: 1, name: 'Black T-shirt', price: 20, stock: 50 },
  { id: 2, name: 'Brown Hoodie', price: 35, stock: 30 },
];
const initialOrders = [
  { id: 101, user: 'John Doe', product: 'Black T-shirt', qty: 2, status: 'Delivered' },
  { id: 102, user: 'Jane Smith', product: 'Brown Hoodie', qty: 1, status: 'Pending' },
];
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer' },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [orders] = useState(initialOrders);
  const [users] = useState(initialUsers);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', stock: '' });
  const [settings, setSettings] = useState({
    adminName: 'Admin',
    email: 'admin@example.com',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [settingsMsg, setSettingsMsg] = useState('');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  // Responsive sidebar toggle
  const toggleSidebar = () => setSidebarOpen((o) => !o);

  // Product CRUD
  const openAddProduct = () => {
    setEditProduct(null);
    setForm({ name: '', price: '', stock: '' });
    setShowProductModal(true);
  };
  const openEditProduct = (product) => {
    setEditProduct(product);
    setForm({ name: product.name, price: product.price, stock: product.stock });
    setShowProductModal(true);
  };
  const handleProductForm = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const saveProduct = (e) => {
    e.preventDefault();
    if (editProduct) {
      setProducts((prods) =>
        prods.map((p) =>
          p.id === editProduct.id ? { ...p, ...form, price: +form.price, stock: +form.stock } : p
        )
      );
    } else {
      setProducts((prods) => [
        ...prods,
        { id: Date.now(), name: form.name, price: +form.price, stock: +form.stock },
      ]);
    }
    setShowProductModal(false);
  };
  const deleteProduct = (id) => {
    setProducts((prods) => prods.filter((p) => p.id !== id));
  };

  // Settings handlers
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings((s) => ({ ...s, [name]: value }));
  };
  const saveSettings = (e) => {
    e.preventDefault();
    // Simple validation for password change
    if (settings.newPassword && settings.newPassword !== settings.confirmPassword) {
      setSettingsMsg('New passwords do not match.');
      return;
    }
    setSettingsMsg('Settings updated successfully!');
    setSettings((s) => ({ ...s, password: '', newPassword: '', confirmPassword: '' }));
  };

  // Main content switch
  const renderMain = () => {
    if (view === 'dashboard') {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-bold text-orange-600">{orders.length}</span>
              <span className="text-gray-600">Orders</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-bold text-orange-600">{products.length}</span>
              <span className="text-gray-600">Products</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-bold text-orange-600">{users.length}</span>
              <span className="text-gray-600">Users</span>
            </div>
          </div>
          <div id="quick-management" className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Management</h2>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600" onClick={openAddProduct}>Add Product</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600" onClick={() => setView('orders')}>View Orders</button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600" onClick={() => setView('users')}>Manage Users</button>
            </div>
          </div>
        </>
      );
    }
    if (view === 'products') {
      return (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Products</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600" onClick={openAddProduct}>Add Product</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Stock</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{p.name}</td>
                    <td className="py-2 px-4">${p.price}</td>
                    <td className="py-2 px-4">{p.stock}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button className="text-blue-600 hover:underline" onClick={() => openEditProduct(p)}>Edit</button>
                      <button className="text-red-600 hover:underline" onClick={() => deleteProduct(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    if (view === 'orders') {
      return (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">User</th>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Qty</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{o.id}</td>
                    <td className="py-2 px-4">{o.user}</td>
                    <td className="py-2 px-4">{o.product}</td>
                    <td className="py-2 px-4">{o.qty}</td>
                    <td className="py-2 px-4">{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    if (view === 'users') {
      return (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">User ID</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{u.id}</td>
                    <td className="py-2 px-4">{u.name}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    if (view === 'settings') {
      return (
        <div className="bg-white rounded-xl shadow p-6 max-w-xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Settings</h2>
          <form onSubmit={saveSettings} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Admin Name</label>
              <input
                name="adminName"
                value={settings.adminName}
                onChange={handleSettingsChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={settings.email}
                onChange={handleSettingsChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Current Password</label>
              <input
                name="password"
                type="password"
                value={settings.password}
                onChange={handleSettingsChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter current password to change password"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">New Password</label>
              <input
                name="newPassword"
                type="password"
                value={settings.newPassword}
                onChange={handleSettingsChange}
                className="w-full border rounded px-3 py-2"
                placeholder="New password"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Confirm New Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={settings.confirmPassword}
                onChange={handleSettingsChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Confirm new password"
              />
            </div>
            {settingsMsg && <div className="text-green-600 font-semibold">{settingsMsg}</div>}
            <div className="flex gap-2 justify-end">
              <button type="submit" className="px-4 py-2 rounded bg-orange-500 text-white font-bold hover:bg-orange-600">Save Changes</button>
            </div>
          </form>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between bg-white shadow p-4">
        <span className="text-xl font-bold text-orange-600">Admin Panel</span>
        <div className="relative">
          <button onClick={() => setAccountMenuOpen((o) => !o)} className="focus:outline-none">
            <MdAccountCircle size={32} className="text-orange-600" />
          </button>
          {accountMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('dashboard'); setAccountMenuOpen(false); }}>Dashboard</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('orders'); setAccountMenuOpen(false); }}>Orders</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('products'); setAccountMenuOpen(false); }}>Products</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('users'); setAccountMenuOpen(false); }}>Users</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('settings'); setAccountMenuOpen(false); }}>Settings</button>
              <div className="border-t my-1"></div>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('dashboard'); setAccountMenuOpen(false); document.getElementById('quick-management')?.scrollIntoView({ behavior: 'smooth' }); }}>Quick Management</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => setAccountMenuOpen(false)}>Logout</button>
            </div>
          )}
        </div>
      </div>
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8  mx-auto w-full">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{view.charAt(0).toUpperCase() + view.slice(1)}</h1>
          <div className="relative hidden md:block">
            <button onClick={() => setAccountMenuOpen((o) => !o)} className="focus:outline-none flex items-center gap-2">
              <MdAccountCircle size={40} className="text-orange-600" />
              <span className="font-semibold text-gray-700 hidden md:inline">{settings.adminName}</span>
            </button>
            {accountMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg z-50">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('dashboard'); setAccountMenuOpen(false); }}>Dashboard</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('orders'); setAccountMenuOpen(false); }}>Orders</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('products'); setAccountMenuOpen(false); }}>Products</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('users'); setAccountMenuOpen(false); }}>Users</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('settings'); setAccountMenuOpen(false); }}>Settings</button>
                <div className="border-t my-1"></div>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setView('dashboard'); setAccountMenuOpen(false); document.getElementById('quick-management')?.scrollIntoView({ behavior: 'smooth' }); }}>Quick Management</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => setAccountMenuOpen(false)}>Logout</button>
              </div>
            )}
          </div>
        </header>
        {renderMain()}
      </main>
      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <form className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md" onSubmit={saveProduct}>
            <h2 className="text-xl font-bold mb-4 text-gray-800">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleProductForm} required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Price</label>
              <input name="price" type="number" min="0" value={form.price} onChange={handleProductForm} required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Stock</label>
              <input name="stock" type="number" min="0" value={form.stock} onChange={handleProductForm} required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={() => setShowProductModal(false)}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-orange-500 text-white font-bold hover:bg-orange-600">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
