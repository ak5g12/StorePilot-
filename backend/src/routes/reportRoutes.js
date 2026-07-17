const express = require("express");

const router = express.Router();

const {
    getSalesReport,
    getLowStockProducts
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");

router.get("/sales", protect, getSalesReport);

router.get("/low-stock", protect, getLowStockProducts);

module.exports = router;