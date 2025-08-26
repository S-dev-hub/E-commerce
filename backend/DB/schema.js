import mongoose from "mongoose";

/*USER*/
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  createdAt: { type: Date, default: Date.now },
});
export const User = mongoose.model("User", userSchema);

/* PRODUCT */
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  images: [String],
  createdAt: { type: Date, default: Date.now },
});
export const Product = mongoose.model("Product", productSchema);

/*  CART */
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});
export const Cart = mongoose.model("Cart", cartSchema);

/* ORDER*/
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  paymentId: String,
  createdAt: { type: Date, default: Date.now },
});
export const Order = mongoose.model("Order", orderSchema);

/*  PAYMENT */
const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  paymentMethod: { type: String, enum: ["card", "upi", "paypal"] },
  amount: Number,
  currency: { type: String, default: "INR" },
  paymentStatus: { type: String, enum: ["success", "failed", "refunded"] },
  transactionId: String,
  createdAt: { type: Date, default: Date.now },
});
export const Payment = mongoose.model("Payment", paymentSchema);

/*REVIEW */
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});
export const Review = mongoose.model("Review", reviewSchema);

/*  EMAIL LOG  */
const emailLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: {
    type: String,
    enum: ["order_confirmation", "password_reset", "welcome"],
  },
  status: { type: String, enum: ["sent", "failed"], default: "sent" },
  sentAt: { type: Date, default: Date.now },
});
export const EmailLog = mongoose.model("EmailLog", emailLogSchema);
