"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import API from "../../../../../lib/api";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sku: "",
    price: "",
    discount: "",
    unit: "",
    material: "",
    deliveryTime: "",
    dimensions: "",
    description: "",
    featured: false,
    bestseller: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);

        const product = data.product;

        setFormData({
          name: product.name || "",
          category: product.category || "",
          sku: product.sku || "",
          price: product.price || "",
          discount: product.discount || "",
          unit: product.unit || "",
          material: product.material || "",
          deliveryTime: product.deliveryTime || "",
          dimensions: product.dimensions || "",
          description: product.description || "",
          featured: product.featured || false,
          bestseller: product.bestseller || false,
        });

        setPreview(product.image?.url);

      } catch (error) {
        toast.error("Failed to load product");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ================= HANDLE IMAGE ================= */

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= HANDLE UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (["price", "discount"].includes(key)) {
          data.append(key, Number(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (image) {
        data.append("image", image);
      }

      await API.put(`/products/${id}`, data);

      toast.success("Product updated successfully ✨");

      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-10 text-white">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-black shadow-2xl rounded-3xl p-10 space-y-8 border border-gray-100"
      >
        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input name="name" label="Product Name" value={formData.name} onChange={handleChange} />
          <Input name="category" label="Category" value={formData.category} onChange={handleChange} />
          <Input name="sku" label="SKU" value={formData.sku} onChange={handleChange} />
          <Input name="unit" label="Unit" value={formData.unit} onChange={handleChange} />
        </div>

        {/* PRICE */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input name="price" label="Price (₹)" type="number" value={formData.price} onChange={handleChange} />
          <Input name="discount" label="Discount (%)" type="number" value={formData.discount} onChange={handleChange} />
        </div>

        {/* EXTRA */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input name="material" label="Material" value={formData.material} onChange={handleChange} />
          <Input name="deliveryTime" label="Delivery Time" value={formData.deliveryTime} onChange={handleChange} />
          <Input name="dimensions" label="Dimensions" value={formData.dimensions} onChange={handleChange} />
        </div>

        {/* CHECKBOXES */}
        <div className="flex gap-8 pt-2">
          <Checkbox name="featured" label="Featured" checked={formData.featured} onChange={handleChange} />
          <Checkbox name="bestseller" label="Bestseller" checked={formData.bestseller} onChange={handleChange} />
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-600">
            Product Image
          </label>

          <div className="flex items-center gap-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {preview && (
              <div className="w-32 h-32 rounded-xl overflow-hidden border shadow">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            rows="5"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-600">
        {label}
      </label>
      <input
        {...props}
        className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
}

/* ================= CHECKBOX ================= */

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        {...props}
        className="w-5 h-5 accent-indigo-600"
      />
      <span className="text-sm font-medium text-gray-700">
        {label}
      </span>
    </label>
  );
}
