import React, { useEffect, useState } from "react";
import API from "../api/axios"; // your axios instance

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await API.get("/dashboard");
        setStats(res.data?.data || null);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow p-4 rounded">
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-xl font-semibold">{stats.totalUsers}</h2>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-xl font-semibold">{stats.totalOrders}</h2>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <p className="text-gray-500">Total Revenue</p>
            <h2 className="text-xl font-semibold">₹{stats.totalRevenue}</h2>
          </div>
        </div>
      ) : (
        <p>No stats available</p>
      )}
    </div>
  );
};

export default Dashboard;
