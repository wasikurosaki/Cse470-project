const express = require("express");
const router = express.Router();

const {
  getAllPayments,
  createPayment,
  updatePaymentStatus,
} = require("../controller/paymentContrtoller");

// Route to create a new payment
router.post("/create", createPayment);

// Route to get all payments
router.get("/getall", getAllPayments);

router.post("/check/:id", updatePaymentStatus);

module.exports = router;
