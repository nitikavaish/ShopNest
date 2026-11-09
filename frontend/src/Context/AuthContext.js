import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart, setCartItems } from "../redux/cartSlice";

export const AuthContext = createContext();

const API = "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userInfo");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Fetch the currently logged-in user's cart
  useEffect(() => {
    let active = true;

    const fetchCart = async () => {
      if (!user?.token) {
        dispatch(clearCart());
        return;
      }

      try {
        const response = await axios.get(`${API}/cart`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (active) {
          dispatch(setCartItems(response.data.cartItems));
        }
      } catch (error) {
        console.error("Fetch cart error:", error);

        if (active) {
          dispatch(clearCart());
        }
      }
    };

    fetchCart();

    return () => {
      active = false;
    };
  }, [user, dispatch]);

  const login = async (userData) => {
    const response = await axios.post(`${API}/auth/login`, userData);

    const userInfo = response.data;

    dispatch(clearCart());

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    setUser(userInfo);

    return userInfo;
  };

  const logout = () => {
    setUser(null);
    dispatch(clearCart());

    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
  };

  const register = async (userData) => {
    const response = await axios.post(`${API}/auth/register`, userData);

    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
