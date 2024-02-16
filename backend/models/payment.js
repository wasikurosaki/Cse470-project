const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      tnxid: { type: String },
      status: { type: String, default: "pending" },
      email_address: { type: String },
      price: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
