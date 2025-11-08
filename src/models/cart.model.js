import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  subtotal: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Example TTL approach (optional): add expiresAt to auto-clear after inactivity
// cartSchema.index({ "updatedAt": 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 }); // 7 days

export default mongoose.model('Cart', cartSchema);
