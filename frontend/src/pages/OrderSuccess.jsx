import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl mx-auto p-8 sm:p-12 bg-zinc-900 rounded-2xl border border-white/5 shadow-2xl text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-emerald-500">
          Payment Successful!
        </h2>

        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-10">
          Thank you for your order. We have securely received your payment and
          will process your shipment shortly.
        </p>

        <Link
          to="/shop"
          className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 shadow-lg shadow-orange-500/20"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
