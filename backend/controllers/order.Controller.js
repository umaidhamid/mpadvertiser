import Order from "../models/Order.model.js";

/* =========================
   CREATE ORDER
========================= */
export const createOrder = async (req, res) => {
    try {
        const {
            customerName,
            phone,
            address,
            notes,
            items,
            subtotal,
            discount,
            total,
        } = req.body;

        /* ===== Basic Validation ===== */
        if (!customerName || !phone) {
            return res.status(400).json({
                success: false,
                message: "Customer name and phone are required",
            });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must contain at least one item",
            });
        }

        if (subtotal == null || total == null) {
            return res.status(400).json({
                success: false,
                message: "Invalid pricing information",
            });
        }

        /* ===== Generate Safe Invoice Number ===== */
        const lastOrder = await Order.findOne()
            .sort({ createdAt: -1 })
            .select("invoiceNumber");

        let nextNumber = 1001;

        if (lastOrder && lastOrder.invoiceNumber) {
            const lastNumber = parseInt(
                lastOrder.invoiceNumber.replace("INV-", "")
            );
            if (!isNaN(lastNumber)) {
                nextNumber = lastNumber + 1;
            }
        }

        const invoiceNumber = `INV-${nextNumber}`;

        /* ===== Create Order ===== */
        const order = await Order.create({
            customerName,
            phone,
            address,
            notes,
            items,
            subtotal,
            discount: discount || 0,
            total,
            invoiceNumber,
            status: "Pending",
        });

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
        });

    } catch (error) {
        console.error("Create Order Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error while creating order",
        });
    }
};


export const getOrders = async (req, res) => {
    try {
        const {
            status,
            search,
            startDate,
            endDate,
            month,
            year,
            page = 1,
            limit = 10,
        } = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);

        let filter = {};
        let dateFilter = {};

        /* ================= STATUS ================= */
        if (status && status !== "All") {
            filter.status = status;
        }

        /* ================= SEARCH ================= */
        if (search && search.trim() !== "") {
            filter.$or = [
                { invoiceNumber: { $regex: search, $options: "i" } },
                { customerName: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
            ];
        }

        /* ================= YEAR FILTER ================= */
        if (year && !month && !startDate && !endDate) {
            const start = new Date(year, 0, 1);
            const end = new Date(year, 11, 31, 23, 59, 59);

            dateFilter = { $gte: start, $lte: end };
        }

        /* ================= MONTH + YEAR FILTER ================= */
        if (month && year) {
            const start = new Date(year, month - 1, 1);
            const end = new Date(year, month, 0, 23, 59, 59);

            dateFilter = { $gte: start, $lte: end };
        }

        /* ================= DATE RANGE FILTER ================= */
        if (startDate || endDate) {
            dateFilter = {};

            if (startDate) {
                dateFilter.$gte = new Date(startDate);
            }

            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                dateFilter.$lte = end;
            }
        }

        if (Object.keys(dateFilter).length > 0) {
            filter.createdAt = dateFilter;
        }

        /* ================= TOTAL COUNT ================= */
        const totalOrders = await Order.countDocuments(filter);

        /* ================= FETCH ORDERS ================= */
        const orders = await Order.find(filter)
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        /* ================= REVENUE AGGREGATION ================= */
        const revenueResult = await Order.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$total" },
                },
            },
        ]);

        const totalRevenue = revenueResult[0]?.totalRevenue || 0;

        return res.status(200).json({
            success: true,
            totalOrders,
            totalPages: Math.ceil(totalOrders / pageSize),
            currentPage: pageNumber,
            totalRevenue,
            orders,
        });

    } catch (error) {
        console.error("Get Orders Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching orders",
        });
    }
};

export const getSingleOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required",
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        console.error("Get Single Order Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Processing",
            "Completed",
            "Cancelled",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Status updated",
            order,
        });

    } catch (error) {
        console.error("Update Order Status Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


/* =========================
   DELETE ORDER
========================= */
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted",
        });

    } catch (error) {
        console.error("Delete Order Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};