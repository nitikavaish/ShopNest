import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products`);
        const data = await res.json();
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-[85vh]">
      {/* Hero Section */}
      <div className="relative mb-[50px] overflow-hidden rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.2),transparent_60%),linear-gradient(135deg,#18181b_0%,#09090b_100%)] px-[30px] py-[100px] text-center text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)] max-[768px]:py-16">
        <h1 className="mb-5 text-[3.5rem] font-bold text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.8)] max-[768px]:text-[2.5rem]">
          Welcome to ShopNest
        </h1>

        <p className="text-[1.2rem] text-zinc-300">
          Your one-stop shop for all your needs!
        </p>
      </div>

      {/* Featured Products */}
      <h2 className="mb-5 text-[2.2rem] font-bold">Featured Products</h2>

      {loading ? (
        <div className="py-10 text-center text-zinc-400">Loading...</div>
      ) : (
        <div className="mt-[30px] grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[30px]">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
