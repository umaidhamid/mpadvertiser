"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";

export default function AdminOffersPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        buttonText: "",
        redirectUrl: "",
    });

    const [latestOffer, setLatestOffer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    // Fetch latest offer
    const fetchLatestOffer = async () => {
        try {
            setFetching(true);
            const res = await API.get("/offers/latest");
            setLatestOffer(res.data.offer);
        } catch (error) {
            setLatestOffer(null);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchLatestOffer();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Create offer
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await API.post("/offers/create", formData);

            alert("Offer created successfully");

            setFormData({
                title: "",
                description: "",
                buttonText: "",
                redirectUrl: "",
            });

            fetchLatestOffer();
        } catch (error) {
            alert(error.response?.data?.message || "Error creating offer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto space-y-10">

                {/* CREATE SECTION */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Create Offer</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-white/10 p-3 rounded-lg outline-none"
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-white/10 p-3 rounded-lg outline-none"
                            rows="4"
                            required
                        />

                        <input
                            type="text"
                            name="buttonText"
                            placeholder="Button Text"
                            value={formData.buttonText}
                            onChange={handleChange}
                            className="w-full bg-white/10 p-3 rounded-lg outline-none"
                        />

                        <input
                            type="text"
                            name="redirectUrl"
                            placeholder="Redirect URL"
                            value={formData.redirectUrl}
                            onChange={handleChange}
                            className="w-full bg-white/10 p-3 rounded-lg outline-none"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-[#681CA1] to-[#AA31E4] text-white px-6 py-3 rounded-lg hover:opacity-90 shadow-lg shadow-[#681CA1]/30 transition disabled:opacity-60"
                        >
                            {loading ? "Creating..." : "Create Offer"}
                        </button>

                    </form>
                </div>


                {/* VIEW SECTION */}
                <div className="bg-white/5 text-white p-6 rounded-2xl border border-white/10 shadow-sm">

                    <h2 className="text-2xl font-bold mb-6">
                        Latest Offer
                    </h2>

                    {fetching ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : latestOffer ? (
                        <div className="space-y-4">

                            <div>
                                <h3 className="text-lg font-semibold">
                                    {latestOffer.title}
                                </h3>
                                <p className="text-gray-300 mt-1">
                                    {latestOffer.description}
                                </p>
                            </div>

                            <div className="text-sm text-gray-400 space-y-1">
                                <p>
                                    Button Text:{" "}
                                    <span className="text-white font-medium">
                                        {latestOffer.buttonText || "Claim Offer"}
                                    </span>
                                </p>

                                <p>
                                    Redirect URL:{" "}
                                    <span className="text-white font-medium">
                                        {latestOffer.redirectUrl || "/Contact-Us"}
                                    </span>
                                </p>
                            </div>

                            <a
                                href={latestOffer.redirectUrl || "/Contact-Us"}
                                className="inline-block mt-4 px-5 py-2 rounded-lg
        bg-gradient-to-r from-[#681CA1] to-[#AA31E4] text-white font-medium
        transition hover:opacity-90 shadow-lg shadow-[#681CA1]/30"
                            >
                                {latestOffer.buttonText || "Claim Offer"}
                            </a>

                        </div>
                    ) : (
                        <p className="text-gray-400">No offer available</p>
                    )}
                </div>


            </div>
        </section>
    );
}
