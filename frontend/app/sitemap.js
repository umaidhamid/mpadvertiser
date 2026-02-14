export const revalidate = 3600; // Revalidate every 1 hour

export default async function sitemap() {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    // ===============================
    // Static Public Pages
    // ===============================
    const staticPages = [
        "",
        "/AboutUs",
        "/Products",
        "/industries",
        "/gallery",
        "/Contact-Us",
    ];

    const staticUrls = staticPages.map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1.0 : 0.8,
    }));

    // ===============================
    // Dynamic Product Pages
    // ===============================
    let productUrls = [];

    try {
        const res = await fetch(
            `${apiUrl}/products/sitemap-products`,
            {
                cache: "no-store", // safer in dev
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        const products = data.products || [];

        productUrls = products.map((product) => ({
            url: `${baseUrl}/Products/${product.slug}`,
            lastModified: product.updatedAt
                ? new Date(product.updatedAt)
                : new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        }));
    } catch (error) {
        console.error("Sitemap product fetch error:", error.message);
    }

    return [...staticUrls, ...productUrls];
}
