"use client";

import { useState, useMemo } from "react";
import ProductsHeader from "../../components/client/products/ProductsHeader";
import ProductsSidebar from "../../components/client/products/ProductsSidebar";
import ProductsGrid from "../../components/client/products/ProductsGrid";
import { productsData } from "../../data/productsData";

export default function ProductsPage() {
  const [category, setCategory] = useState("All");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 6;

  const categories = ["All", "Printing", "Business", "Outdoor"];

  const clearFilters = () => {
    setCategory("All");
    setMin("");
    setMax("");
    setDiscountOnly(false);
    setSort("latest");
    setSearch("");
    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    let products = [...productsData];

    if (category !== "All") {
      products = products.filter((p) => p.category === category);
    }

    if (min !== "") {
      products = products.filter(
        (p) => p.finalprice >= Number(min)
      );
    }

    if (max !== "") {
      products = products.filter(
        (p) => p.finalprice <= Number(max)
      );
    }

    if (discountOnly) {
      products = products.filter((p) => p.discount > 0);
    }

    if (search) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case "priceLow":
        products.sort((a, b) => a.finalprice - b.finalprice);
        break;
      case "priceHigh":
        products.sort((a, b) => b.finalprice - a.finalprice);
        break;
      case "discount":
        products.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    return products;
  }, [category, min, max, discountOnly, sort, search]);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const totalPages = Math.ceil(filteredProducts.length / perPage);

  return (
    <section className="min-h-screen bg-black text-white py-24 px-6">

      <div className="mx-auto">

        <ProductsHeader
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          results={filteredProducts.length}
        />

        <div className="grid lg:grid-cols-4 gap-14 mt-12">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProductsSidebar
              categories={categories}
              category={category}
              setCategory={setCategory}
              min={min}
              max={max}
              setMin={setMin}
              setMax={setMax}
              discountOnly={discountOnly}
              setDiscountOnly={setDiscountOnly}
              clearFilters={clearFilters}
            />
          </div>

          {/* Grid */}
          <div className="lg:col-span-3">
            <ProductsGrid products={paginatedProducts} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-4">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 rounded-lg transition ${
                      page === i + 1
                        ? "bg-indigo-600"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
