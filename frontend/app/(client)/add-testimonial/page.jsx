"use client";

import { useState } from "react";
import Api from "../../lib/api";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddTestimonialPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        role: "",
        company: "",
        location: "",
        text: "",
        rating: 5,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.text.trim()) {
            toast.error("Name and testimonial are required");
            return;
        }

        try {
            setLoading(true);

            await Api.post("/testimonials/create", {
                ...form,
                isActive: false,
                isOwner: false,
            });

            toast.success("Thank you! Your testimonial is under review.");

            setForm({
                name: "",
                role: "",
                company: "",
                location: "",
                text: "",
                rating: 5,
            });

            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch (err) {
            toast.error("Submission failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12">

            <div className="w-full max-w-xl bg-card border border-border rounded-2xl p-8 shadow-lg">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Share Your Experience
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* INPUTS */}
                    <input
                        type="text"
                        placeholder="Your Name *"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="w-full bg-background border border-border p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                    />

                    <input
                        type="text"
                        placeholder="Role (optional)"
                        value={form.role}
                        onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                        }
                        className="w-full bg-background border border-border p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                    />

                    <input
                        type="text"
                        placeholder="Company (optional)"
                        value={form.company}
                        onChange={(e) =>
                            setForm({ ...form, company: e.target.value })
                        }
                        className="w-full bg-background border border-border p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                    />

                    <input
                        type="text"
                        placeholder="Location (optional)"
                        value={form.location}
                        onChange={(e) =>
                            setForm({ ...form, location: e.target.value })
                        }
                        className="w-full bg-background border border-border p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                    />

                    <textarea
                        placeholder="Write your testimonial *"
                        rows={4}
                        value={form.text}
                        onChange={(e) =>
                            setForm({ ...form, text: e.target.value })
                        }
                        className="w-full bg-background border border-border p-3 rounded-lg outline-none resize-none focus:ring-2 focus:ring-primary"
                    />

                    {/* RATING */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted">
                            Rating:
                        </span>

                        {[1, 2, 3, 4, 5].map((num) => (
                            <Star
                                key={num}
                                size={22}
                                onClick={() =>
                                    setForm({ ...form, rating: num })
                                }
                                className={`cursor-pointer transition ${form.rating >= num
                                        ? "text-primary"
                                        : "text-muted"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground 
            hover:opacity-90 transition 
            py-3 rounded-lg flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Submitting...
                            </>
                        ) : (
                            "Submit Testimonial"
                        )}
                    </button>

                </form>
            </div>

        </section>
    );
}
