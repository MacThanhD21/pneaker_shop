import mongoose from 'mongoose';

const sizeEnum = [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];

const reviewSchema = mongoose.Schema({
  rating: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  size: {
    type: [Number],
    enum: sizeEnum,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rates: {
    type: Number,
    default: 1,
  },
  numReviews: {
    type: Number,
    default: 1,
  },
  reviews: [reviewSchema],
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  },
});
productSchema.pre('save', async function () {
  if (this.size.length < 1) {
    this.inStock = false;
  }
});

export default mongoose.model('Product', productSchema);
