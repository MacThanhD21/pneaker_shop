import Cart from '../../models/Cart.js';
import Order from '../../models/Order.js';
import Product from '../../models/Product.js';
import { auth } from '../../utils/auth.js';
import { UserInputError } from 'apollo-server';

export const order = {
  Query: {
    getUserOrders: async (_, {}, context) => {
      const userAuth = await auth(context);
      const order = await Order.find({ purchasedBy: userAuth._id });

      if (!order) {
        throw new UserInputError('No order available');
      }
      return order;
    },
    getAllOrders: async (_, {}, context) => {
      const orders = await Order.find({});
      return orders;
    },
  },
  Mutation: {
    createOrder: async (_, {}, context) => {
      const userAuth = await auth(context);
      const cart = await Cart.findOne({ userId: userAuth._id });
      const products = await Product.find({
        _id: cart.cartProducts.map((c) => c.productId),
      });
      const topPicksBrands = products.map((p) => p.brand);
    
      // Fix: Only update the matching product
      for (const cartItem of cart.cartProducts) {
        if (!cartItem.selected) continue; // Skip unselected items
        
        const product = products.find(p => p._id.toString() === cartItem.productId.toString());
        if (product) {
          // Find the size object and update its quantity
          const sizeObj = product.size.find(s => s.size === +cartItem.size);
          if (sizeObj) {
            sizeObj.quantity -= 1;
            await product.save();
          }
        }
      }
    
      if (cart.cartProducts.length < 1) {
        throw new UserInputError('No available order!');
      }
    
      userAuth.topPicks.push(...topPicksBrands);
      await userAuth.save();
    
      
      const orderMake = cart.cartProducts.filter((e) => e.selected === true);
      
      const newOrder = new Order({
        orderProducts:
          orderMake.map((item) => ({
            productId: item.productId,
            size: item.size,
            productPrice: item.productPrice,
            _id: item._id
          })),
        purchasedBy: userAuth._id,
        datePurchased: new Date(),
      });

      
      await newOrder.save();
      return newOrder ;
    },
  },
};
