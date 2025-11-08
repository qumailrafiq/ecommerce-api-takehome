const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
  },
  { timestamps: true }
);

// index for filtering by price and category if needed
productSchema.index({ price: 1 });
productSchema.index({ categoryId: 1 });

module.exports = mongoose.model('Product', productSchema);
