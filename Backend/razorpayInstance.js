const Razorpay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

module.exports = instance;