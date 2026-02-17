"use client";

import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import ProductCard from "../ProductCard";

export default function ProductsGrid({ products }) {
    return (
        <div className="relative">

            {/* Product Count */}
            <div className="mb-8 flex justify-between items-center">
                <p className="text-muted-foreground text-sm">
                    {products.length} Product{products.length !== 1 && "s"} Found
                </p>
            </div>

            {/* Empty State */}
            {products.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-32 text-center"
                >
                    <div className="w-20 h-20 flex items-center justify-center 
          rounded-full bg-card border border-border mb-6">
                        <PackageSearch size={36} className="text-muted-foreground" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                        No Products Found
                    </h3>

                    <p className="text-muted-foreground max-w-md">
                        Try adjusting your filters or clearing them to explore
                        more products.
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    layout
                    className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            layout
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.05,
                            }}
                        >
                            <ProductCard product={product} index={index} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
