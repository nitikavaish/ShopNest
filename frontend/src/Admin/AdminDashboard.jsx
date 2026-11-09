import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/analytics", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate("/login");
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setStats({
          totalOrders: 0,
          totalProducts: 0,
          totalUsers: 0,
          totalRevenue: 0,
        });
      }
    };

    fetchStats();
  }, [user, navigate]);

  const statCards = [
    {
      title: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: "📋",
    },
    {
      title: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: "📦",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: "👥",
    },
    {
      title: "Total Revenue",
      value: `₹${(stats?.totalRevenue ?? 0).toFixed(2)}`,
      icon: "💰",
    },
  ];

  const adminActions = [
    {
      title: "Add Product",
      description: "Add new products to your store",
      icon: "➕",
      path: "/admin/add-product",
      style: "bg-orange-500 hover:bg-orange-600",
    },
    {
      title: "Manage Products",
      description: "View, edit and delete products",
      icon: "📦",
      path: "/admin/products",
      style: "bg-zinc-700 hover:bg-zinc-600",
    },
    {
      title: "Manage Orders",
      description: "Track and update customer orders",
      icon: "🚚",
      path: "/admin/orders",
      style: "bg-zinc-700 hover:bg-zinc-600",
    },
    {
      title: "Users Directory",
      description: "View registered users",
      icon: "👥",
      path: "/admin/users",
      style: "bg-zinc-700 hover:bg-zinc-600",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <img
            src="/ShopNestLogo.png"
            alt="ShopNest Logo"
            className="h-12 w-12 rounded-xl object-cover shadow-lg shadow-orange-500/20"
          />

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-xs text-zinc-500">ShopNest Administration</p>
          </div>
        </div>

        <p className="text-zinc-400 text-base sm:text-lg mb-10 mt-4">
          Welcome back,{" "}
          <span className="text-orange-400 font-semibold">{user?.name}</span>
        </p>

        {/* Statistics */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-5">Store Overview</h2>

          {stats ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {statCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-zinc-400 text-sm font-medium">
                      {card.title}
                    </h3>

                    <span className="text-2xl">{card.icon}</span>
                  </div>

                  <p className="text-3xl font-bold text-orange-500">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-16">
              <div className="flex items-center gap-3 text-orange-500">
                <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                Loading metrics...
              </div>
            </div>
          )}
        </div>

        {/* Administrative Controls */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
          <div className="mb-7">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-500">
              Administrative Controls
            </h2>

            <p className="text-zinc-400 text-sm mt-2">
              Manage your store, products, orders and customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {adminActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`${action.style} rounded-xl p-5 text-left flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] shadow-md`}
              >
                <span className="text-3xl">{action.icon}</span>

                <div>
                  <h3 className="font-semibold text-white text-base">
                    {action.title}
                  </h3>

                  <p className="text-sm text-white/70 mt-1">
                    {action.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-600 text-sm mt-10">
          ShopNest Admin Panel © 2026
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
