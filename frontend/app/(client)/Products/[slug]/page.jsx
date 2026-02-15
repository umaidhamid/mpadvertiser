"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import API from "../../../lib/api";
import Link from "next/link";
import { Phone, ShoppingCart, Share2, Copy, Check, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { CartContext } from "../../../context/CartContext";
import Image from "next/image";
export default function SingleProductPage() {
    const pathname = usePathname();
    const [copied, setCopied] = useState(false);

    const fullUrl =
        typeof window !== "undefined"
            ? window.location.origin + pathname
            : "";
    const { slug } = useParams();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    /* ---------------- FETCH PRODUCT ---------------- */
    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await API.get(`/products/${slug}`);
            setProduct(res.data.product);
        } catch (error) {
            console.error("Product fetch error:", error);
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
            console.error("Related fetch error:", error);
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



    if (loading) {
        return (
            <section className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </section>
        );
    }

    if (!product) {
        return (
            <section className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-gray-500">Product not found</p>
            </section>
        );
    }

    return (
        <section className="bg-black text-white">

            {/* ================= PRODUCT ================= */}
            <div className="max-w-7xl mx-auto px-6 py-24">

                {/* Breadcrumb */}
                <div className="mb-12 text-sm text-gray-500">
                    <Link href="/Products" className="hover:text-white transition">
                        Products
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-300">{product.name}</span>
                </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">

  {/* IMAGE COLUMN */}
  <div className="lg:sticky lg:top-24 self-start">

    <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">

      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[75vh] max-h-[750px]">

        <Image
          src={product.image?.url || "/placeholder.png"}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1280px) 50vw,
                 50vw"
          className="object-contain p-8 transition-transform duration-700 hover:scale-105"
        />

      </div>

    </div>

  </div>

  {/* DETAILS COLUMN */}
  <div className="space-y-8">

    <p className="uppercase text-xs tracking-widest text-gray-500">
      {product.category}
    </p>

    <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">
      {product.name}
    </h1>

    {/* Price Block */}
    <div className="border border-white/10 rounded-xl p-6 bg-neutral-900/50 space-y-3">

      <div className="flex items-end gap-4">
        <span className="text-3xl font-bold">
          ₹{product.finalprice}
        </span>

        {product.discount > 0 && (
          <span className="line-through text-gray-500">
            ₹{product.price}
          </span>
        )}
      </div>

      {product.discount > 0 && (
        <p className="text-sm text-green-400">
          You save {product.discount}%
        </p>
      )}

    </div>

    <p className="text-gray-400 leading-relaxed">
      {product.description}
    </p>

    {/* Specs */}
    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
      <Spec label="Unit" value={product.unit} />
      <Spec label="Material" value={product.material} />
      <Spec label="Delivery Time" value={product.deliveryTime} />
      <Spec label="Dimensions" value={product.dimensions} />
    </div>

    {/* ACTION PANEL */}
    <div className="border border-white/10 rounded-xl p-6 bg-neutral-900/50 space-y-4">

      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
      >
        Add to Cart
      </button>

      <a
        href="tel:+91949455296"
        className="w-full block text-center py-4 border border-white/20 rounded-lg hover:bg-white hover:text-black transition"
      >
        Call Now
      </a>

      <div className="flex justify-center gap-6 pt-4">

        <button
          onClick={handleShare}
          className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition"
        >
          <Share2 size={18} />
        </button>

        <button
          onClick={handleCopy}
          className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>

        <button
          className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition"
        >
          <Heart size={18} />
        </button>

      </div>

    </div>

  </div>

</div>

            </div>

            {/* ================= RELATED PRODUCTS ================= */}
            {related.length > 0 && (
                <div className="border-t border-white/10 py-24">
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
                                        <div className="bg-neutral-900 rounded-2xl overflow-hidden">
                                            <img
                                                src={item.image?.url}
                                                alt={item.name}
                                                className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-lg group-hover:text-gray-300 transition">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm mt-1">
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

/* Reusable Spec Component */
function Spec({ label, value }) {
    return (
        <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="mt-1 font-medium text-white">{value || "—"}</p>
        </div>
    );
}
