"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../lib/api";
import jsPDF from "jspdf";

export default function InvoicePage() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await API.get(`/orders/${id}`);
                setOrder(res.data.order);
            } catch (err) {
                setError("Failed to load invoice");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchOrder();
    }, [id]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        let y = 20;

        // Header
        doc.setFontSize(18);
        doc.text("MP Advertisers", 14, y);
        y += 8;

        doc.setFontSize(11);
        doc.text(`Invoice No: ${order.invoiceNumber}`, 14, y);
        y += 6;
        doc.text(
            `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
            14,
            y
        );
        y += 10;

        // Customer
        doc.setFontSize(12);
        doc.text("Customer Details", 14, y);
        y += 6;

        doc.setFontSize(11);
        doc.text(`Name: ${order.customerName}`, 14, y);
        y += 6;
        doc.text(`Phone: ${order.phone}`, 14, y);
        y += 6;
        doc.text(`Address: ${order.address || "-"}`, 14, y);
        y += 10;

        // Table Header
        doc.setFontSize(12);
        doc.text("Items", 14, y);
        y += 6;

        doc.setFontSize(11);
        doc.text("Product", 14, y);
        doc.text("Qty", 120, y);
        doc.text("Price", 140, y);
        doc.text("Total", 170, y);
        y += 6;

        doc.line(14, y, 195, y);
        y += 6;

        // Items
        order.items.forEach((item) => {
            doc.text(
                `${item.name} (${item.variant})`,
                14,
                y
            );
            doc.text(`${item.quantity}`, 120, y);
            doc.text(`₹${item.price}`, 140, y);
            doc.text(
                `₹${item.price * item.quantity}`,
                170,
                y
            );
            y += 8;
        });

        y += 6;
        doc.line(14, y, 195, y);
        y += 8;

        // Totals
        doc.text(`Subtotal: ₹${order.subtotal}`, 140, y);
        y += 6;
        doc.text(`Discount: ₹${order.discount}`, 140, y);
        y += 6;
        doc.setFontSize(13);
        doc.text(`Grand Total: ₹${order.total}`, 140, y);

        doc.save(`${order.invoiceNumber}.pdf`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                Loading invoice...
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                {error || "Invoice not found"}
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-black py-20 px-6">
            <div className="max-w-4xl mx-auto bg-gray-900 shadow-xl rounded-xl p-10">

                {/* Header */}
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h1 className="text-3xl font-bold">
                            MP Advertisers
                        </h1>
                        <p className="text-sm text-gray-500">
                            Professional Printing Solutions
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="font-semibold">
                            Invoice #{order.invoiceNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Customer */}
                <div className="mb-8">
                    <h3 className="font-semibold mb-2">
                        Customer Details
                    </h3>
                    <p>{order.customerName}</p>
                    <p>{order.phone}</p>
                    <p>{order.address}</p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="p-3 text-left">Product</th>
                                <th className="p-3">Qty</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-3">
                                        {item.name} ({item.variant})
                                    </td>
                                    <td className="p-3 text-center">
                                        {item.quantity}
                                    </td>
                                    <td className="p-3 text-center">
                                        ₹{item.price}
                                    </td>
                                    <td className="p-3 text-center">
                                        ₹{item.price * item.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="mt-8 flex justify-end">
                    <div className="w-64 space-y-2 text-right">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>- ₹{order.discount}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-3">
                            <span>Total</span>
                            <span>₹{order.total}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-10 flex gap-4">
                    <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-gray-800 text-white rounded-lg"
                    >
                        Print Invoice
                    </button>

                    <button
                        onClick={downloadPDF}
                        className="px-6 py-3 bg-black text-white rounded-lg"
                    >
                        Download PDF
                    </button>
                </div>

            </div>
        </section>
    );
}
