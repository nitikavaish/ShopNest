import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.03] bg-[#18181b] shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_0_1px_rgba(249,115,22,0.3)]">
      {/* Product Image */}
      <img
        src={product.imagesUrl}
        alt={product.name}
        className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Product Information */}
      <div className="relative z-[2] flex flex-1 flex-col justify-between bg-gradient-to-t from-[#18181b] via-[#18181b] to-transparent p-5 text-left">
        <div>
          <h3 className="mb-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-[1.1rem] font-bold text-white">
            {product.name}
          </h3>

          <p className="mb-[15px] text-[22px] font-bold text-orange-500">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <Link
          to={`/product/${product._id}`}
          className="inline-block rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 px-5 py-3 text-center text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(234,88,12,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_6px_20px_rgba(234,88,12,0.5)]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
