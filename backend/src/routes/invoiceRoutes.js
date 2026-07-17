const express = require("express");

const router = express.Router();

const {
    createInvoice,
    getInvoices,
    getInvoice,
    updateInvoiceStatus
} = require("../controllers/invoiceController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createInvoice);

router.get("/", protect, getInvoices);

router.get("/:id", protect, getInvoice);

router.put("/:id", protect, updateInvoiceStatus);

module.exports = router;