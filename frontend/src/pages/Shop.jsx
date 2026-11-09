import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Our <span className="text-orange-500">Products</span>
          </h2>

          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            Discover products you'll love, all in one place.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mb-10 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />

            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-zinc-500">
              ⌕
            </span>
          </div>

          <p className="mt-3 text-sm text-zinc-500">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-orange-500" />
              <p className="mt-4 text-sm text-zinc-400">Loading products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-16 text-center">
            <p className="text-2xl">🔍</p>

            <h3 className="mt-4 text-xl font-semibold">No products found</h3>

            <p className="mt-2 text-sm text-zinc-400">
              Try searching with a different product name.
            </p>

            <button
              onClick={() => setSearch("")}
              className="mt-6 rounded-lg bg-orange-500 px-5 py-2.5 font-medium text-white transition hover:bg-orange-600"
            >
              Clear Search
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
