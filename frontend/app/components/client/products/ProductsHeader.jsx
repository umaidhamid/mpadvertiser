"use client";

export default function ProductsHeader({
  search,
  setSearch,
  sort,
  setSort,
  results,
  categories,
  category,
  setCategory,
  discountOnly,
  setDiscountOnly,
  clearFilters,
}) {
  return (
    <div className="space-y-8">

      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold">All Products</h1>
          <p className="text-gray-400 mt-2">
            Showing {results} products
          </p>
        </div>
      </div>

      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-6">

        {/* Search */}
        {/* <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-black border border-white/10 focus:outline-none"
        /> */}

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-black border border-white/10"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-black">
              {cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded-lg bg-black border border-white/10"
        >
          <option value="">Latest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="discount">Best Discount</option>
        </select>

        {/* Discount Toggle */}
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={discountOnly}
            onChange={(e) => setDiscountOnly(e.target.checked)}
            className="accent-indigo-600"
          />
          Discount Only
        </label>

        {/* Clear */}
        <button
          onClick={clearFilters}
          className="ml-auto px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 transition"
        >
          Clear Filters
        </button>

      </div>
    </div>
  );
}
