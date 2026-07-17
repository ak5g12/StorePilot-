const Customer = require("../models/Customer");

// Create Customer
exports.createCustomer = async (req, res) => {
    try {

        const { name, phone, email, address } = req.body;

        const existingCustomer = await Customer.findOne({ phone });

        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: "Customer already exists"
            });
        }

        const customer = await Customer.create({
            name,
            phone,
            email,
            address
        });

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            customer
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Customers
exports.getCustomers = async (req, res) => {
    try {

        const customers = await Customer.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: customers.length,
            customers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Customer
exports.getCustomer = async (req, res) => {
    try {

        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.json({
            success: true,
            customer
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Customer
exports.updateCustomer = async (req, res) => {
    try {

        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.json({
            success: true,
            message: "Customer updated successfully",
            customer
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Customer
exports.deleteCustomer = async (req, res) => {
    try {

        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        await customer.deleteOne();

        res.json({
            success: true,
            message: "Customer deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};