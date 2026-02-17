"use client";

import { useEffect, useState } from "react";
import ProductsHeader from "../../components/client/products/ProductsHeader";
import ProductsGrid from "../../components/client/products/ProductsGrid";
import API from "../../lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("All");
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 15;

  /* ================= FETCH CATEGORIES ================= */

  const fetchCategories = async () => {
    try {
      const res = await API.get("/products/categories");
      setCategories(["All", ...res.data.categories]);
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  };

  /* ================= FETCH PRODUCTS ================= */

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: perPage,
      };

      if (category !== "All") params.category = category;
      if (discountOnly) params.discountOnly = true;
      if (search) params.search = search;
      if (sort) params.sort = sort;

      const res = await API.get("/products/get", { params });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Product fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [category, discountOnly, sort, search, page]);

  const clearFilters = () => {
    setCategory("All");
    setDiscountOnly(false);
    setSort("");
    setSearch("");
    setPage(1);
  };

  return (
    <section className="min-h-screen bg-background text-foreground py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <ProductsHeader
          search={search}
          setSearch={(val) => {
            setPage(1);
            setSearch(val);
          }}
          sort={sort}
          setSort={(val) => {
            setPage(1);
            setSort(val);
          }}
          results={products.length}
          categories={categories}
          category={category}
          setCategory={(val) => {
            setPage(1);
            setCategory(val);
          }}
          discountOnly={discountOnly}
          setDiscountOnly={(val) => {
            setPage(1);
            setDiscountOnly(val);
          }}
          clearFilters={clearFilters}
        />

        {/* Products Grid */}
        <div className="mt-16">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">
              Loading products...
            </div>
          ) : (
            <ProductsGrid products={products} />
          )}
        </div>

      </div>
    </section>
  );
}
