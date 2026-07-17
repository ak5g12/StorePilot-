const Invoice = require("../models/Invoice");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Sales Report
exports.getSalesReport = async (req, res) => {
    try {

        const totalRevenue = await Invoice.aggregate([
            {
                $match: { status: "Paid" }
            },
            {
                $group: {
                    _id: null,
                    revenue: { $sum: "$amount" }
                }
            }
        ]);

        const totalOrders = await Order.countDocuments();

        const paidInvoices = await Invoice.countDocuments({
            status: "Paid"
        });

        const unpaidInvoices = await Invoice.countDocuments({
            status: "Unpaid"
        });

        res.json({
            success: true,
            report: {
                totalRevenue: totalRevenue.length ? totalRevenue[0].revenue : 0,
                totalOrders,
                paidInvoices,
                unpaidInvoices
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Low Stock Report
exports.getLowStockProducts = async (req, res) => {

    try {

        const products = await Product.find({
            stockQuantity: { $lte: 5 }
        }).select("name sku stockQuantity");

        res.json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};