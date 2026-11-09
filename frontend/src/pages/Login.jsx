import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
        darkMode ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full transition ${
              darkMode
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-orange-500">
            ShopNest
            <span className={darkMode ? "text-white" : "text-gray-900"}>.</span>
          </Link>

          <h2
            className={`text-2xl font-bold mt-6 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Welcome Back!
          </h2>

          <p className={darkMode ? "text-gray-400 mt-2" : "text-gray-500 mt-2"}>
            Login to continue shopping with us.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm mb-5">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-500"
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-500"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-orange-500 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label
              className={`flex items-center gap-2 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <input type="checkbox" className="accent-orange-500" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <p
          className={`text-center mt-7 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>

        {/* Home */}
        <div className="text-center mt-5">
          <Link
            to="/"
            className={`text-sm hover:text-orange-500 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
