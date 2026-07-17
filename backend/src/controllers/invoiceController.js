const Invoice = require("../models/Invoice");
const Order = require("../models/Order");

// Create Invoice
exports.createInvoice = async (req, res) => {
    try {

        const { orderId, dueDate } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const existingInvoice = await Invoice.findOne({ orderId });

        if (existingInvoice) {
            return res.status(400).json({
                success: false,
                message: "Invoice already exists"
            });
        }

        const invoice = await Invoice.create({
            invoiceNumber: "INV" + Date.now(),
            orderId,
            amount: order.totalAmount,
            dueDate
        });

        res.status(201).json({
            success: true,
            message: "Invoice created successfully",
            invoice
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Invoices
exports.getInvoices = async (req, res) => {

    try {

        const invoices = await Invoice.find()
            .populate("orderId")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: invoices.length,
            invoices
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Single Invoice
exports.getInvoice = async (req, res) => {

    try {

        const invoice = await Invoice.findById(req.params.id)
            .populate("orderId");

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found"
            });
        }

        res.json({
            success: true,
            invoice
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Invoice Status
exports.updateInvoiceStatus = async (req, res) => {

    try {

        const invoice = await Invoice.findById(req.params.id);

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found"
            });
        }

        invoice.status = req.body.status;

        await invoice.save();

        res.json({
            success: true,
            message: "Invoice updated successfully",
            invoice
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};