const express = require("express");

const router = express.Router();


const {
    createOrder,
    getOrders,
    getOrder,
    updateOrder
} = require("../controllers/orderController");


const { protect } = require("../middleware/authMiddleware");



// Create Order
router.post("/", protect, createOrder);


// Get All Orders
router.get("/", protect, getOrders);


// Get Single Order
router.get("/:id", protect, getOrder);


// Update Order Status
router.put("/:id", protect, updateOrder);



module.exports = router;