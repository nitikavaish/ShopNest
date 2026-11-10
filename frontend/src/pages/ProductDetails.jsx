import React, { useEffect, useState, useContext } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import axios from "axios";

import { setCartItems } from "../redux/cartSlice";
import { AuthContext } from "../Context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Add product to MongoDB cart
  const handleAddToCart = async () => {
    if (!user?.token) {
      alert("Please login first to add products to cart");
      navigate("/login");
      return;
    }

    if (!product || product.stock <= 0) {
      alert("Product is out of stock!");
      return;
    }

    try {
      setAdding(true);

      const response = await axios.post(
        "/api/cart/add",
        {
          productId: product._id,
          qty: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      // Update Redux with backend response
      dispatch(setCartItems(response.data.cartItems));

      alert("Successfully added to your cart!");
    } catch (error) {
      console.error("Add to cart error:", error);

      alert(error.response?.data?.message || "Unable to add product to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">
        <h2 className="text-2xl font-bold">Product Not Found</h2>

        <Link to="/shop" className="mt-4 text-orange-500 hover:text-orange-400">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 text-white sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
        {/* Product Image */}
        <div className="overflow-hidden rounded-2xl bg-zinc-900">
          <img
            src={product.imagesUrl}
            alt={product.name}
            className="h-[400px] w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm text-orange-500">{product.category}</p>

          <h1 className="text-3xl font-bold sm:text-4xl">{product.name}</h1>

          <p className="mt-5 text-2xl font-bold text-orange-500">
            ₹{product.price}
          </p>

          <p className="mt-6 leading-7 text-zinc-400">{product.description}</p>

          <p className="mt-5 text-sm">
            Stock:{" "}
            <span
              className={product.stock > 0 ? "text-green-400" : "text-red-400"}
            >
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </span>
          </p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || adding}
            className="mt-8 rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-zinc-700"
          >
            {adding
              ? "Adding..."
              : product.stock > 0
                ? "Add to Cart"
                : "Out of Stock"}
          </button>

          <Link
            to="/shop"
            className="mt-5 text-sm text-zinc-400 transition hover:text-orange-500"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
