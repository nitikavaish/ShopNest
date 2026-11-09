import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../Context/AuthContext";

import logo from "../assests/logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="flex justify-between items-center px-[50px] py-[18px]
      bg-[rgba(9,9,11,0.8)] backdrop-blur-xl
      border-b border-white/5 sticky top-0 z-[1000]
      shadow-[0_4px_30px_rgba(0,0,0,0.5)]
      max-[768px]:flex-col max-[768px]:gap-[15px]
      max-[768px]:px-5 max-[768px]:py-[15px]"
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[28px]
          font-bold text-white tracking-[-1px]
          [text-shadow:0_2px_10px_rgba(249,115,22,0.3)]
          after:content-['.'] after:text-orange-500 after:text-4xl"
        >
          <img
            src={logo}
            alt="ShopNest Logo"
            className="w-9 h-9 object-contain"
          />
          ShopNest
        </Link>
      </div>

      {/* Navigation Links */}
      <ul
        className="flex items-center gap-[30px]
        max-[480px]:flex-wrap max-[480px]:justify-center"
      >
        <li>
          <Link
            to="/shop"
            className="relative text-[15px] font-medium text-zinc-400
            hover:text-white transition-colors duration-300
            after:content-[''] after:absolute after:w-0 after:h-0.5
            after:bg-orange-500 after:rounded-sm
            after:left-0 after:-bottom-[6px]
            after:transition-all after:duration-300
            hover:after:w-full"
          >
            Shop
          </Link>
        </li>

        {user && (
          <li>
            <Link
              to="/cart"
              className="relative text-[15px] font-medium text-zinc-400
            hover:text-white transition-colors duration-300
            after:content-[''] after:absolute after:w-0 after:h-0.5
            after:bg-orange-500 after:rounded-sm
            after:left-0 after:-bottom-[6px]
            after:transition-all after:duration-300
            hover:after:w-full"
            >
              Cart{" "}
              {`(${cartItems.reduce((total, item) => total + item.qty, 0)})`}
            </Link>
          </li>
        )}

        {user ? (
          <>
            <li>
              <Link
                to="/profile"
                className="relative text-[15px] font-medium text-zinc-400
                hover:text-white transition-colors duration-300"
              >
                Hi, {user.name}
              </Link>
            </li>

            {user.role === "admin" && (
              <li>
                <Link
                  to="/admin"
                  className="relative text-[15px] font-medium text-zinc-400
                  hover:text-white transition-colors duration-300
                  after:content-[''] after:absolute after:w-0 after:h-0.5
                  after:bg-orange-500 after:rounded-sm
                  after:left-0 after:-bottom-[6px]
                  after:transition-all after:duration-300
                  hover:after:w-full"
                >
                  Admin
                </Link>
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                className="bg-transparent text-red-500
                border border-red-500/30 px-4 py-2 rounded-md
                cursor-pointer font-semibold
                transition-all duration-300
                hover:bg-red-500/10 hover:border-red-500
                hover:-translate-y-px"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className="relative text-[15px] font-medium text-zinc-400
            hover:text-white transition-colors duration-300
            after:content-[''] after:absolute after:w-0 after:h-0.5
            after:bg-orange-500 after:rounded-sm
            after:left-0 after:-bottom-[6px]
            after:transition-all after:duration-300
            hover:after:w-full"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
