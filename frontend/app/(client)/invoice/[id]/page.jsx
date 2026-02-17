"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import API from "../../../lib/api";
import jsPDF from "jspdf";

export default function InvoicePage() {
    const { id } = useParams();
    const invoiceRef = useRef(null);

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

    /* ---------------- DOWNLOAD PDF ---------------- */
    const downloadPDF = () => {
        if (!order) return;

        const doc = new jsPDF();
        let y = 20;

        doc.setFontSize(18);
        doc.text("MP Advertisers", 14, y);
        y += 10;

        doc.setFontSize(11);
        doc.text(`Invoice #: ${order.invoiceNumber}`, 14, y);
        y += 6;
        doc.text(
            `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
            14,
            y
        );
        y += 10;

        doc.text("Customer Details", 14, y);
        y += 6;
        doc.text(`Name: ${order.customerName}`, 14, y);
        y += 6;
        doc.text(`Phone: ${order.phone}`, 14, y);
        y += 6;
        doc.text(`Address: ${order.address || "-"}`, 14, y);
        y += 10;

        doc.text("Items", 14, y);
        y += 8;

        doc.setFontSize(10);
        doc.text("Product", 14, y);
        doc.text("Qty", 120, y);
        doc.text("Price", 140, y);
        doc.text("Total", 170, y);
        y += 4;
        doc.line(14, y, 195, y);
        y += 8;

        order.items.forEach((item) => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }

            doc.text(`${item.name} (${item.variant})`, 14, y);
            doc.text(String(item.quantity), 120, y);
            doc.text(`₹${item.price}`, 140, y);
            doc.text(`₹${item.price * item.quantity}`, 170, y);
            y += 8;
        });

        y += 6;
        doc.line(14, y, 195, y);
        y += 8;

        doc.text(`Subtotal: ₹${order.subtotal}`, 140, y);
        y += 6;
        doc.text(`Discount: ₹${order.discount}`, 140, y);
        y += 6;

        doc.setFontSize(12);
        doc.text(`Grand Total: ₹${order.total}`, 140, y);

        doc.save(`${order.invoiceNumber}.pdf`);
    };

    /* ---------------- SEND WHATSAPP ---------------- */
    const sendToOwner = () => {

        // 1️⃣ Order check
        if (!order) {
            alert("Order not loaded.");
            return;
        }

        // 2️⃣ Invoice validation
        if (!order._id || !order.invoiceNumber) {
            alert("Invoice is not ready.");
            return;
        }

        // 3️⃣ Owner number validation (India format)
        const ownerNumber = "919149455296";

        const phoneRegex = /^91[6-9]\d{9}$/;

        if (!phoneRegex.test(ownerNumber)) {
            alert("Owner WhatsApp number is invalid.");
            return;
        }

        // 4️⃣ Required order data
        if (!order.customerName || !order.total) {
            alert("Order details incomplete.");
            return;
        }

        // 5️⃣ Invoice URL validation
        const invoiceUrl = `${window.location.origin}/invoice/${order._id}`;

        try {
            new URL(invoiceUrl);
        } catch {
            alert("Invoice URL is invalid.");
            return;
        }

    
        const message = `📦 New Order Received

Invoice: ${order.invoiceNumber}
Customer: ${order.customerName}
Phone: ${order.phone || "-"}

Total: ₹${order.total}

View Invoice:
${invoiceUrl}

⚠ Important:
Please confirm this order only if BOTH the invoice number and the invoice link above are present and accessible.

If anything is missing, do not process this order.`;


        const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

        // 7️⃣ Open WhatsApp only if everything valid
        window.open(whatsappUrl, "_blank");
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
        <section className="min-h-screen bg-black py-20 px-6 print:bg-white">
            <div
                ref={invoiceRef}
                className="max-w-4xl mx-auto bg-gray-900 print:bg-white text-white print:text-black shadow-xl rounded-xl p-10"
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h1 className="text-3xl font-bold">
                            MP Advertisers
                        </h1>
                        <p className="text-sm text-gray-400 print:text-gray-600">
                            Professional Printing Solutions
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="font-semibold">
                            Invoice #{order.invoiceNumber}
                        </p>
                        <p className="text-sm text-gray-400 print:text-gray-600">
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
                    <p>{order.address || "-"}</p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-700 print:border-black">
                        <thead className="bg-gray-800 print:bg-gray-200">
                            <tr>
                                <th className="p-3 text-left">Product</th>
                                <th className="p-3 text-center">Qty</th>
                                <th className="p-3 text-center">Price</th>
                                <th className="p-3 text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, i) => (
                                <tr key={i} className="border-t border-gray-700 print:border-black">
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
                        <div className="flex justify-between text-green-500">
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
                <div className="mt-10 flex gap-4 print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-gray-800 rounded-lg"
                    >
                        Print Invoice
                    </button>

                    <button
                        onClick={downloadPDF}
                        className="px-6 py-3 bg-black rounded-lg"
                    >
                        Download PDF
                    </button>

                    <button
                        onClick={sendToOwner}
                        className="px-6 py-3 bg-green-600 rounded-lg"
                    >
                        Send to Owner
                    </button>
                </div>
            </div>
        </section>
    );
}
