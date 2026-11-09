import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
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
        <div className="flex justify-end mb-3">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full ${
              darkMode
                ? "bg-gray-800 text-yellow-400"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Heading */}
        <div className="text-center mb-7">
          <Link to="/" className="text-3xl font-bold text-orange-500">
            ShopNest
            <span className={darkMode ? "text-white" : "text-gray-900"}>.</span>
          </Link>

          <h2
            className={`text-2xl font-bold mt-5 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Create Account
          </h2>

          <p className={darkMode ? "text-gray-400 mt-2" : "text-gray-500 mt-2"}>
            Join ShopNest and start shopping today!
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className={`w-full px-4 py-3 rounded-lg border outline-none focus:border-orange-500 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

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
              className={`w-full px-4 py-3 rounded-lg border outline-none focus:border-orange-500 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900"
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
                placeholder="Create a password"
                required
                minLength={6}
                className={`w-full px-4 py-3 rounded-lg border outline-none focus:border-orange-500 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className={`w-full px-4 py-3 rounded-lg border outline-none focus:border-orange-500 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Terms */}
          <label
            className={`flex items-start gap-2 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <input
              type="checkbox"
              required
              className="mt-1 accent-orange-500"
            />
            <span>
              I agree to the{" "}
              <Link
                to="/disclaimer"
                className="text-orange-500 hover:underline"
              >
                terms and conditions
              </Link>
              .
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition shadow-md"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p
          className={`text-center mt-7 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        <div className="text-center mt-5">
          <Link
            to="/"
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            } hover:text-orange-500`}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
