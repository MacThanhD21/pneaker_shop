import mongoose from 'mongoose';
import Cart from './Cart.js';

const orderProductSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  }
});

const orderSchema = mongoose.Schema({
  purchasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  orderProducts: {
    type: [orderProductSchema],
    required: true,
  },
  datePurchased: {
    type: Date,
  },
});

orderSchema.pre('save', async function () {
  const cart = await Cart.findOne({ userId: this.purchasedBy });
  if (cart) {
    cart.cartProducts = cart.cartProducts.filter(item => !item.selected);
  }
  await cart.save();
});

export default mongoose.model('Order', orderSchema);
