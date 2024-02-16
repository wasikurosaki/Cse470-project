const Payment = require("../models/Payment");

// POST a payment
const createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).send(payment);
  } catch (error) {
    res.status(400).send(error);
  }
};

// GET all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.send(payments);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePaymentStatus = async (req, res) => {
  const paymentId = req.params.id;
  const { status } = req.body;

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }

    payment.paymentResult.status = status;
    await payment.save();

    res.send(payment);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createPayment, getAllPayments, updatePaymentStatus };
