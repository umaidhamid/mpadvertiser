"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../lib/api";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function SingleProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await API.get(`/products/${id}`);
            setProduct(res.data.product);
        } catch (error) {
            console.error("Product fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <section className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-gray-500">Loading product...</p>
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

    const message = `
Hello, I’m interested in the following product:

Product Name: ${product.name}
SKU: ${product.sku}
Category: ${product.category}
Unit: ${product.unit}
Material: ${product.material}

Please share more details.
`;

    const whatsappLink = `https://wa.me/9149455296?text=${encodeURIComponent(message)}`;

    return (
        <section className="min-h-screen bg-black text-white py-24 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb */}
                <div className="mb-10 text-sm text-gray-500">
                    <Link href="/products" className="hover:text-white transition">
                        Products
                    </Link>
                    <span className="mx-2">/</span>
                    <span>{product.name}</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-20">

                    {/* Image */}
                    <div className="rounded-2xl overflow-hidden border border-white/10">
                        <img
                            src={product.image?.url}
                            alt={product.name}
                            className="w-full h-[500px] object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="space-y-8">

                        {/* Category */}
                        <p className="uppercase text-xs tracking-widest text-gray-500">
                            {product.category}
                        </p>

                        {/* Title */}
                        <h1 className="text-4xl font-semibold leading-tight">
                            {product.name}
                        </h1>

                        {/* Price Section */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-4">
                                <p className="text-3xl font-bold">
                                    ₹{product.finalprice}
                                </p>

                                {product.discount > 0 && (
                                    <p className="line-through text-gray-500">
                                        ₹{product.price}
                                    </p>
                                )}
                            </div>

                            {product.discount > 0 && (
                                <p className="text-sm text-gray-400">
                                    You save {product.discount}% on this product
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 leading-relaxed border-t border-white/10 pt-6">
                            {product.description}
                        </p>

                        {/* Specifications */}
                        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">

                            <Spec label="Unit" value={product.unit} />
                            <Spec label="Material" value={product.material} />
                            <Spec label="Delivery Time" value={product.deliveryTime} />
                            <Spec label="Dimensions" value={product.dimensions} />

                        </div>

                        {/* Flags */}
                        <div className="flex gap-4 pt-6">
                            {product.featured && (
                                <span className="px-4 py-2 border border-white/20 text-sm">
                                    Featured
                                </span>
                            )}
                            {product.bestseller && (
                                <span className="px-4 py-2 border border-white/20 text-sm">
                                    Bestseller
                                </span>
                            )}
                        </div>

                        {/* CTA */}
                        <div className="pt-8">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 px-8 py-4
    bg-white text-black font-medium rounded-full
    transition-all duration-300
    hover:bg-green-500 hover:text-white
    hover:shadow-lg hover:shadow-green-500/30"
                            >
                                <MessageCircle size={18} className="transition-transform duration-300 group-hover:scale-110" />
                                <span>Enquire on WhatsApp</span>
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

/* Small reusable spec component */
function Spec({ label, value }) {
    return (
        <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="mt-1 font-medium text-white">{value || "—"}</p>
        </div>
    );
}
