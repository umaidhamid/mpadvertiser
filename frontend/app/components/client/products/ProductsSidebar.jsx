"use client";


export default function ProductsSidebar({
    categories,
    category,
    setCategory,
    min,
    max,
    setMin,
    setMax,
    discountOnly,
    setDiscountOnly,
    sort,
    setSort,
    clearFilters,
}) {
    return (
        <aside className="sticky top-24 space-y-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

            {/* Title */}
            <div>
                <h3 className="text-2xl font-bold mb-2">
                    Filters
                </h3>
                <p className="text-sm text-gray-400">
                    Refine your product search
                </p>
            </div>

            {/* Category Filter */}
            <div>
                <h4 className="text-lg font-semibold mb-4 text-indigo-400">
                    Categories
                </h4>

                <div className="space-y-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`block w-full text-left px-4 py-2 rounded-lg transition duration-300 ${category === cat
                                    ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg"
                                    : "bg-white/5 hover:bg-white/10 text-gray-300"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

        

            {/* Discount Toggle */}
            <div>
                <h4 className="text-lg font-semibold mb-4 text-indigo-400">
                    Offers
                </h4>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={discountOnly}
                        onChange={() => setDiscountOnly(!discountOnly)}
                        className="accent-indigo-600 w-4 h-4"
                    />
                    <span className="text-gray-300 text-sm">
                        Show Discounted Products Only
                    </span>
                </label>
            </div>

            {/* Sort Options */}
            <div>
                <h4 className="text-lg font-semibold mb-4 text-indigo-400">
                    Sort By
                </h4>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 focus:outline-none focus:border-indigo-500"
                >
                    <option value="latest">Latest</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="discount">Biggest Discount</option>
                </select>
            </div>

            {/* Clear Filters */}
            <div>
                <button
                    onClick={clearFilters}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition"
                >
                    Clear Filters
                </button>
            </div>

        </aside>
    );
}
