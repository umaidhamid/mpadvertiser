"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, usePathname } from "next/navigation";
import API from "../../../lib/api";
import Link from "next/link";
import { Share2, Copy, Check, Heart } from "lucide-react";
import { CartContext } from "../../../context/CartContext";
import Image from "next/image";

export default function SingleProductPage() {
  const pathname = usePathname();
  const { slug } = useParams();
  const { addToCart } = useContext(CartContext);

  const [copied, setCopied] = useState(false);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const fullUrl =
    typeof window !== "undefined"
      ? window.location.origin + pathname
      : "";

  /* ---------------- FETCH PRODUCT ---------------- */
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/products/${slug}`);
      setProduct(res.data.product);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FETCH RELATED ---------------- */
  const fetchRelated = async () => {
    try {
      const res = await API.get("/products/get", {
        params: { limit: 4 },
      });
      setRelated(res.data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchProduct();
      fetchRelated();
    }
  }, [slug]);

  const handleAddToCart = () => {
    addToCart(product, {
      label: product.unit,
      price: product.finalprice,
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: "Check out this product",
        url: fullUrl,
      });
    } else {
      handleCopy();
    }
  };

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <section className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </section>
    );
  }

  return (
    <section className="bg-background text-foreground">

      {/* ================= PRODUCT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* Breadcrumb */}
        <div className="mb-12 text-sm text-muted-foreground">
          <Link href="/Products" className="hover:text-foreground transition">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* IMAGE */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
            <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[75vh] max-h-[750px]">
              <Image
                src={product.image?.url || "/placeholder.png"}
                alt={product.name}
                fill
                priority
                className="object-contain transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
          {/* DETAILS */}
          <div className="space-y-8">

            <p className="uppercase text-xs tracking-widest text-muted-foreground">
              {product.category}
            </p>

            <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">
              {product.name}
            </h1>

            {/* PRICE BLOCK */}
            <div className="border border-border rounded-xl p-6 bg-card space-y-3">
              <div className="flex items-end gap-4">
                <span className="text-3xl font-bold">
                  ₹{product.finalprice}
                </span>

                {product.discount > 0 && (
                  <span className="line-through text-muted-foreground">
                    ₹{product.price}
                  </span>
                )}
              </div>

              {product.discount > 0 && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  You save {product.discount}%
                </p>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* SPECS */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
              <Spec label="Unit" value={product.unit} />
              <Spec label="Material" value={product.material} />
              <Spec label="Delivery Time" value={product.deliveryTime} />
              <Spec label="Dimensions" value={product.dimensions} />
            </div>

            {/* ACTION PANEL */}
            <div className="border border-border rounded-xl p-6 bg-card space-y-4">

              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition"
              >
                Add to Cart
              </button>

              <a
                href="tel:+919149455296"
                className="w-full block text-center py-4 border border-border rounded-lg hover:bg-muted transition"
              >
                Call Now
              </a>

              <div className="flex justify-center gap-6 pt-4">

                <button
                  onClick={handleShare}
                  className="p-3 border border-border rounded-full hover:bg-muted transition"
                >
                  <Share2 size={18} />
                </button>

                <button
                  onClick={handleCopy}
                  className="p-3 border border-border rounded-full hover:bg-muted transition"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>

                <button className="p-3 border border-border rounded-full hover:bg-muted transition">
                  <Heart size={18} />
                </button>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ================= RELATED ================= */}
      {related.length > 0 && (
        <div className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-2xl font-semibold mb-12">
              You may also like
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related
                .filter((item) => item.slug !== slug)
                .slice(0, 4)
                .map((item) => (
                  <Link
                    key={item._id}
                    href={`/Products/${item.slug}`}
                    className="group"
                  >
                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                      <img
                        src={item.image?.url}
                        alt={item.name}
                        className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg group-hover:text-primary transition">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        ₹{item.finalprice}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

/* -------- Reusable Spec -------- */
function Spec({ label, value }) {
  return (
    <div>
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="mt-1 font-medium text-foreground">
        {value || "—"}
      </p>
    </div>
  );
}
