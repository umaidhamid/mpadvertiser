"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import API from "../../../lib/api";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filters
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [featured, setFeatured] = useState(false);
    const [bestseller, setBestseller] = useState(false);
    const [discountOnly, setDiscountOnly] = useState(false);

    const [sort, setSort] = useState("");

    /* ================= FETCH PRODUCTS ================= */

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const params = {
                page,
                limit: 12,
            };

            if (search) params.search = search;
            if (category) params.category = category;
            if (featured) params.featured = true;
            if (bestseller) params.bestseller = true;
            if (discountOnly) params.discountOnly = true;

            if (sort) params.sort = sort;

            const response = await API.get("/products/get", { params });

            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, search, category, featured, bestseller, discountOnly, sort]);

    /* ================= DELETE ================= */

    const handleDelete = async (id) => {
        if (!confirm("Delete this product?")) return;

        try {
            await API.delete(`/products/${id}`);
            toast.success("Product deleted");
            fetchProducts();
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    if (loading) return <p className="p-10 text-gray-400">Loading...</p>;

    return (
        <div className="py-12 px-6 max-w-7xl mx-auto text-white">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Manage Products</h1>

                <Link
                    href="/admin/products/create"
                    className="px-6 py-3 border rounded-xl hover:border-indigo-500 transition"
                >
                    + Create Product
                </Link>
            </div>

            {/* FILTERS */}
            <div className="border rounded-2xl p-6 mb-12 grid md:grid-cols-4 gap-6">

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                    className="p-3 rounded-xl border bg-transparent"
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => {
                        setPage(1);
                        setCategory(e.target.value);
                    }}
                    className="p-3 rounded-xl border bg-transparent"
                />




                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="p-3 rounded-xl border bg-black"
                >
                    <option value="" className="bg-black/30">Sort By</option>
                    <option value="priceLow">Price Low</option>
                    <option value="priceHigh">Price High</option>
                    <option value="discount">Highest Discount</option>
                </select>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={() => setFeatured(!featured)}
                    />
                    Featured
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={bestseller}
                        onChange={() => setBestseller(!bestseller)}
                    />
                    Bestseller
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={discountOnly}
                        onChange={() => setDiscountOnly(!discountOnly)}
                    />
                    Discount Only
                </label>

                <button
                    onClick={() => {
                        setSearch("");
                        setCategory("");
                        setFeatured(false);
                        setBestseller(false);
                        setDiscountOnly(false);

                        setSort("");
                        setPage(1);
                    }}
                    className="border rounded-xl py-3 hover:border-red-500 transition"
                >
                    Reset Filters
                </button>
            </div>

            {/* PRODUCTS GRID */}
            {products.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    No products found.
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-3xl overflow-hidden hover:border-indigo-500 transition"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={product.image?.url}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-6 space-y-4">
                                <h2 className="text-lg font-semibold">
                                    {product.name}
                                </h2>

                                <p className="text-sm text-gray-400">
                                    {product.category}
                                </p>

                                <div>
                                    <p className="text-xl font-bold">
                                        ₹{product.finalprice}
                                    </p>

                                    {product.discount > 0 && (
                                        <p className="text-sm line-through text-gray-500">
                                            ₹{product.price}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Link
                                        href={`/admin/products/edit/${product.slug}`}
                                        className="flex-1 text-center py-2 border rounded-xl hover:border-yellow-500 transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="flex-1 py-2 border rounded-xl hover:border-red-500 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* PAGINATION */}
            <div className="flex justify-center mt-12 gap-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-40"
                >
                    Prev
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
