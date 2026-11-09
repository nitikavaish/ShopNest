import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../Context/AuthContext";
import { setCartItems } from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const API = "http://localhost:5000/api/cart";

  const headers = {
    Authorization: `Bearer ${user?.token}`,
  };

  // Remove product from cart
  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`${API}/remove/${id}`, { headers });

      dispatch(setCartItems(response.data.cartItems));
    } catch (error) {
      console.error("Remove cart error:", error);

      alert(error.response?.data?.message || "Unable to remove product");
    }
  };

  // Update product quantity
  const handleUpdateQty = async (item, qty) => {
    if (qty < 1) return;

    try {
      const response = await axios.put(
        `${API}/update/${item._id}`,
        { qty },
        { headers },
      );

      dispatch(setCartItems(response.data.cartItems));
    } catch (error) {
      console.error("Update quantity error:", error);

      alert(error.response?.data?.message || "Unable to update quantity");
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  // Calculate total quantity
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // Check authentication
  if (!user?.token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center text-white">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 text-4xl">
          🛒
        </div>

        <h2 className="text-2xl font-bold">Please Login First</h2>

        <p className="mt-2 text-zinc-400">Login to view your shopping cart.</p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-semibold hover:bg-orange-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Shopping Cart</h2>

          <p className="mt-2 text-sm text-zinc-400">
            Review your items before checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-16 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 text-4xl">
              🛒
            </div>

            <h3 className="text-xl font-semibold">Your cart is empty</h3>

            <p className="mt-2 text-sm text-zinc-400">
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/shop"
              className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-semibold transition hover:bg-orange-600"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-5 lg:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700 sm:flex-row"
                >
                  {/* Product Image */}
                  <div className="h-44 w-full shrink-0 overflow-hidden rounded-xl bg-zinc-800 sm:h-36 sm:w-36">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>

                      <p className="mt-2 text-lg font-bold text-orange-500">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center overflow-hidden rounded-lg border border-zinc-700">
                        <button
                          onClick={() => handleUpdateQty(item, item.qty - 1)}
                          disabled={item.qty <= 1}
                          className="px-4 py-2 text-lg transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          -
                        </button>

                        <span className="min-w-10 text-center font-medium">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => handleUpdateQty(item, item.qty + 1)}
                          className="px-4 py-2 text-lg transition hover:bg-zinc-800"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-sm font-medium text-red-400 transition hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:sticky lg:top-24">
              <h3 className="text-xl font-bold">Order Summary</h3>

              <div className="mt-6 space-y-4 border-b border-zinc-800 pb-5">
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between text-sm text-zinc-400">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
              </div>

              <div className="mt-5 flex justify-between text-lg font-bold">
                <span>Total</span>

                <span className="text-orange-500">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-7 w-full rounded-lg bg-orange-500 py-3 font-semibold transition hover:bg-orange-600"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="mt-4 block text-center text-sm text-zinc-400 transition hover:text-orange-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
