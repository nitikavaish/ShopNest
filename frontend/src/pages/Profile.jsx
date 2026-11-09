import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, Link, Navigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchMyOrders = async () => {
      setLoading(true);
      setOrderError("");

      try {
        // Check whether token is available
        if (!user.token) {
          setOrderError(
            "Authentication token is missing. Please login again to view your orders.",
          );
          return;
        }

        const res = await fetch("/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(Array.isArray(data.orders) ? data.orders : []);
        } else {
          console.error("Orders API error:", res.status, data);

          if (res.status === 401) {
            setOrderError(
              "Your session token is invalid or expired. Please login again to view your orders.",
            );
          } else {
            setOrderError(data.message || "Unable to fetch your orders.");
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrderError(
          "Unable to connect to the server. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user?.token,user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Protect Profile page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const initials = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-5 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Profile Heading */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            My <span className="text-orange-500">Profile</span>
          </h1>
          <p className="text-zinc-400 mt-2">
            Manage your account and view your orders.
          </p>
        </div>

        {/* Profile Information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 shrink-0 rounded-full bg-orange-500 flex items-center justify-center text-4xl font-bold shadow-lg shadow-orange-500/20">
                {initials}
              </div>

              {/* User Details */}
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">
                  {user.name || "Customer"}
                </h2>

                <p className="text-zinc-400 mt-2 break-all">
                  {user.email || "Email not available"}
                </p>

                <span className="inline-block mt-3 px-4 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold capitalize">
                  {user.role || "Customer"}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold"
            >
              Logout
            </button>
          </div>

          {/* Account Information */}
          <div className="mt-8 pt-7 border-t border-zinc-800">
            <h3 className="text-lg font-semibold mb-5">Account Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-zinc-500">Full Name</label>
                <div className="mt-2 bg-zinc-800 rounded-lg px-4 py-3">
                  {user.name || "Not available"}
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-500">Email Address</label>
                <div className="mt-2 bg-zinc-800 rounded-lg px-4 py-3 break-all">
                  {user.email || "Not available"}
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-500">Account Type</label>
                <div className="mt-2 bg-zinc-800 rounded-lg px-4 py-3 capitalize">
                  {user.role || "Customer"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
          <div className="flex justify-between items-center mb-7">
            <h2 className="text-2xl font-bold">
              My <span className="text-orange-500">Orders</span>
            </h2>

            <span className="text-sm text-zinc-400">
              {orders.length} Orders
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-zinc-400 animate-pulse">
                Fetching your orders...
              </p>
            </div>
          ) : orderError ? (
            <div className="bg-zinc-950 border border-yellow-500/20 rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-yellow-400">{orderError}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-10 text-center">
              <div className="text-5xl mb-4">📦</div>

              <h3 className="text-xl font-semibold">No Orders Yet</h3>

              <p className="text-zinc-400 mt-2 mb-6">
                You haven't placed any orders yet. Start shopping!
              </p>

              <Link
                to="/shop"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 hover:border-orange-500/40 transition-all"
                >
                  <div className="space-y-2">
                    <p className="text-sm text-zinc-400">
                      Order ID:
                      <span className="text-white ml-2 break-all">
                        {order._id}
                      </span>
                    </p>

                    <p className="text-sm text-zinc-400">
                      Placed On:
                      <span className="text-white ml-2">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "Not available"}
                      </span>
                    </p>

                    <p className="text-sm text-zinc-400">
                      Total:
                      <span className="text-green-400 font-bold ml-2">
                        ₹{Number(order.totalAmount || 0).toFixed(2)}
                      </span>
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      order.status === "delivered"
                        ? "bg-green-500/10 text-green-400"
                        : order.status === "shipped"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {order.status || "pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
