import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { clearCart } from "../redux/cartSlice";

// Load Razorpay SDK
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentLoading, setPaymentLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  // Save order after successful payment verification
  const saveOrder = async (paymentId) => {
    try {
      const products = cartItems.map((item) => ({
        product: item._id,
        quantity: item.qty,
      }));

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          products,
          totalAmount: totalPrice,
          address,
          paymentId,
        }),
      });

      const data = await response.json();

      console.log("Order API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Order creation failed");
      }
      // 3. Clear cart from MongoDB
      const cartResponse = await fetch("/api/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const cartData = await cartResponse.json();

      if (!cartResponse.ok) {
        throw new Error(
          cartData.message || "Order placed but cart clearing failed",
        );
      }

      // Clear cart only after successful order creation
      dispatch(clearCart());

      alert("Order placed successfully!");

      navigate("/order-success");
    } catch (error) {
      console.error("Order Saving Error:", error);
      alert(error.message || "Unable to save order");
      throw error;
    }
  };

  // Student bypass mode
  const bypassPayment = async () => {
    try {
      await saveOrder("bypass_txn_" + Date.now());
    } catch (error) {
      console.error("Bypass Payment Error:", error);
    }
  };

  // Main Razorpay payment function
  const handlePayment = async () => {
    if (paymentLoading) return;

    if (!user || !user.token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      navigate("/cart");
      return;
    }

    setPaymentLoading(true);

    try {
      // Load Razorpay SDK
      const sdkLoaded = await loadRazorpayScript();

      if (!sdkLoaded || !window.Razorpay) {
        throw new Error("Razorpay SDK failed to load");
      }

      // Create Razorpay order on backend
      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      });

      const orderData = await orderRes.json();

      console.log("Razorpay Order Response:", orderData);

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.message || "Payment initialization failed");
      }

      const razorpayKey = orderData.key;
      const razorpayOrder = orderData.order;

      if (!razorpayKey || !razorpayOrder?.id) {
        throw new Error("Razorpay Key ID or Order ID is missing");
      }

      // Razorpay checkout options
      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "ShopNest",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            setPaymentLoading(true);

            // Verify payment on backend
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();

            console.log("Payment Verification:", verifyData);

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(
                verifyData.message || "Payment verification failed",
              );
            }

            // Save order after successful verification
            await saveOrder(response.razorpay_payment_id);
          } catch (error) {
            console.error("Payment Verification / Order Error:", error);
            alert(error.message || "Unable to complete your order");
          } finally {
            setPaymentLoading(false);
          }
        },

        prefill: {
          name: address.fullName,
          email: user?.email || "",
          contact: "",
        },

        theme: {
          color: "#f97316",
        },

        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
            console.log("Razorpay payment window closed");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response) {
        console.error("Razorpay Payment Failed:", response.error);

        alert(
          response.error.description || "Payment failed. Please try again.",
        );

        setPaymentLoading(false);
      });

      paymentObject.open();
    } catch (error) {
      console.error("Payment Error:", error);

      alert(error.message || "Something went wrong. Please try again.");

      setPaymentLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !address.fullName ||
      !address.street ||
      !address.city ||
      !address.postalCode ||
      !address.country
    ) {
      alert("Please fill in all delivery details");
      return;
    }

    handlePayment();
  };

  const inputStyle =
    "w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-200";

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Secure <span className="text-orange-500">Checkout</span>
          </h1>

          <p className="text-zinc-400 mt-3">
            Complete your order by providing your shipping details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-2xl">📍</span>

              <div>
                <h2 className="text-xl font-bold">Shipping Address</h2>

                <p className="text-sm text-zinc-400">
                  Enter your delivery information
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={address.fullName}
                  onChange={(e) =>
                    setAddress({ ...address, fullName: e.target.value })
                  }
                  className={inputStyle}
                />
              </div>

              {/* Street */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Street Address
                </label>

                <input
                  type="text"
                  placeholder="House number, street name"
                  required
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className={inputStyle}
                />
              </div>

              {/* City and Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    City
                  </label>

                  <input
                    type="text"
                    placeholder="Enter city"
                    required
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    placeholder="Postal code"
                    required
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        postalCode: e.target.value,
                      })
                    }
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Country
                </label>

                <input
                  type="text"
                  placeholder="Enter country"
                  required
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                  className={inputStyle}
                />
              </div>

              {/* Mobile Payment Button */}
              <div className="lg:hidden pt-4">
                <h3 className="text-xl font-bold mb-4">
                  Total:{" "}
                  <span className="text-orange-500">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </h3>

                <button
                  type="submit"
                  disabled={cartItems.length === 0 || paymentLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition duration-300"
                >
                  {paymentLoading ? "Processing..." : "Pay Now →"}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="h-fit bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-zinc-400">
                <span>Total Items</span>

                <span className="text-white font-medium">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>

                <span className="text-white font-medium">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>

                <span className="text-emerald-400 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t border-zinc-700 pt-5 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total to Pay</span>

                <span className="text-2xl font-bold text-orange-500">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Desktop Payment Button */}
            <button
              type="button"
              onClick={(e) => {
                const form = e.currentTarget
                  .closest(".grid")
                  .querySelector("form");

                if (form) {
                  form.requestSubmit();
                }
              }}
              disabled={cartItems.length === 0 || paymentLoading}
              className="hidden lg:block w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg shadow-orange-500/20"
            >
              {paymentLoading ? "Processing..." : "Pay Now →"}
            </button>

            <p className="text-xs text-zinc-500 text-center mt-5">
              🔒 Your payment information is securely processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
