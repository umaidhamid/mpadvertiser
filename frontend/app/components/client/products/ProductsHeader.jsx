"use client";

export default function ProductsHeader({
    search,
    setSearch,
    sort,
    setSort,
    results,
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>
                <h1 className="text-4xl font-bold">All Products</h1>
                <p className="text-gray-400 mt-2">
                    Showing {results} products
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none"
                />

                {/* Sorting */}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                >
                    <option value="latest" className="bg-black">Latest</option>
                    <option value="priceLow" className="bg-black">Price: Low to High</option>
                    <option value="priceHigh" className="bg-black">Price: High to Low</option>
                    <option value="discount" className="bg-black">Best Discount</option>
                </select>

            </div>
        </div>
    );
}