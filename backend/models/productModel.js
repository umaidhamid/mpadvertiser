import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
    {
        /* ================= BASIC INFO ================= */

        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            minlength: 2,
            maxlength: 200,
        },

        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
            index: true,
        },

        sku: {
            type: String,
            required: [true, "SKU is required"],
            unique: true,
            trim: true,
        },

        description: {
            type: String,
            maxlength: 2000,
        },

        /* ================= PRICING ================= */

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: 0,
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        finalprice: {
            type: Number,
        },

        unit: {
            type: String,
            default: "piece",
        },

        /* ================= RATINGS ================= */

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        reviews: {
            type: Number,
            default: 0,
        },

        /* ================= FLAGS ================= */

        featured: {
            type: Boolean,
            default: false,
        },

        bestseller: {
            type: Boolean,
            default: false,
        },

        /* ================= EXTRA DETAILS ================= */

        tags: {
            type: [String],
            default: [],
        },

        material: String,
        deliveryTime: String,
        dimensions: String,

        highlights: {
            type: [String],
            default: [],
        },

        /* ================= IMAGE (CLOUDINARY) ================= */

        image: {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            },
        },
    },
    { timestamps: true }
);

/* ================= AUTO FINAL PRICE & SLUG ================= */

productSchema.pre("save", async function () {

    // Final price calculation
    if (this.price >= 0) {
        this.finalprice =
            this.price - (this.price * this.discount) / 100;
    }

    // Slug generation (only if new or name modified)
    if (this.isModified("name")) {
        const baseSlug = slugify(this.name, {
            lower: true,
            strict: true,
        });

        let slug = baseSlug;
        let counter = 1;

        while (await mongoose.models.Product.findOne({ slug })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        this.slug = slug;
    }
});


/* ================= TEXT SEARCH INDEX ================= */

productSchema.index({
    name: "text",
    description: "text",
});

const Product = mongoose.model("Product", productSchema);

export default Product;
