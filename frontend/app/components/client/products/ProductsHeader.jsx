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
          <h1 className="text-4xl font-bold text-foreground">
            All Products
          </h1>
          <p className="text-muted-foreground mt-2">
            Showing {results} products
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 
      bg-card border border-border 
      rounded-2xl p-6 shadow-sm">

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg 
          bg-background border border-border 
          text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded-lg 
          bg-background border border-border 
          text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Latest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="discount">Best Discount</option>
        </select>

        {/* Discount Toggle */}
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={discountOnly}
            onChange={(e) => setDiscountOnly(e.target.checked)}
            className="accent-primary"
          />
          Discount Only
        </label>

        {/* Clear Button */}
        <button
          onClick={clearFilters}
          className="ml-auto px-5 py-2 rounded-full 
          bg-primary text-primary-foreground 
          text-sm font-semibold 
          hover:opacity-90 transition"
        >
          Clear Filters
        </button>

      </div>
    </div>
  );
}
