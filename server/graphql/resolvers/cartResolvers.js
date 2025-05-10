import Product from '../../models/Product.js';
import { UserInputError } from 'apollo-server';
import Cart from '../../models/Cart.js';
import { auth } from '../../utils/auth.js';

export const cart = {
  Query: {
    getUserCart: async (_, {}, context) => {
      const user = await auth(context);
      const cart = await Cart.findOne({ userId: user._id });
      if (!cart) {
        throw new UserInputError('No user cart.');
      }
      return { ...cart._doc, user };
    },
  },
  Mutation: {
    addToCart: async (
      _,
      { userId, productId, size, productPrice, quantity},
      context
    ) => {
      const userAuth = await auth(context);
      const product = await Product.findById(productId);
      const existCart = await Cart.findOne({ userId: userAuth._id });
      const existItem = existCart?.cartProducts.find(
        (item) => item.productId === productId
      );

      if (!product) {
        throw new UserInputError('No product found');
      }
      if (productPrice !== product.price) {
        throw new UserInputError('Wrong Info');
      }

      // Ensure size is a single number
      let sizeNumber;
      if (Array.isArray(size)) {
        if (size.length !== 1) {
          throw new UserInputError('Size must be a single number');
        }
        sizeNumber = Number(size[0]);
      } else if (typeof size === 'string') {
        sizeNumber = parseFloat(size.replace(/[\[\]]/g, ''));
      } else {
        sizeNumber = Number(size);
      }

      if (isNaN(sizeNumber)) {
        throw new UserInputError('Invalid size value');
      }

      
      if (existCart) {
        // Update any existing items that might be missing size
        existCart.cartProducts.forEach(item => {
          if (item.size === undefined) {
            item.size = sizeNumber;
          }
        });

        const newCartProduct = {
          productId,
          size: Number(sizeNumber),
          productPrice: Number(productPrice),
          selected: false,
          quantity: Number(quantity),
        };
        existCart?.cartProducts.push(newCartProduct);
        await existCart.save();
        return { ...existCart._doc };
      } else {
        const newCart = new Cart({
          userId,
          cartProducts: [{
            size: Number(sizeNumber),
            productId,
            productPrice: Number(productPrice),
            selected: true,
            quantity: Number(quantity)
          }],
        });
        console.log('New cart:', JSON.stringify(newCart, null, 2));
        return newCart.save();
      }
    },

    deleteProductFromCart: async (_, { id }, context) => {
      const userAuth = await auth(context);
      const cart = await Cart.findOne({ userId: userAuth._id });

      if (userAuth?._id.toString() !== cart?.userId.toString()) {
        throw new UserInputError('Permission denied!');
      }
      if (!cart) {
        throw new UserInputError('Bad Input!');
      }

      cart.cartProducts = cart.cartProducts.filter(
        (product) => product._id.toString() !== id.toString()
      );

      await cart.save();

      return { ...cart._doc, userId: userAuth._id };
    },

    updateCartItemsSelection: async (_, { cartProductIds, selected }, context) => {
      const userAuth = await auth(context);
      const cart = await Cart.findOne({ userId: userAuth._id });

      if (userAuth?._id.toString() !== cart?.userId.toString()) {
        throw new UserInputError('Permission denied!');
      }
      if (!cart) {
        throw new UserInputError('Bad Input!');
      }

      cart.cartProducts.forEach(product => {
        cartProductIds.forEach( (item) => {
          if(product._id.toString() === item.toString()) {
            product.selected = selected;
          }
        }
        )
      });

      await cart.save();
      return { ...cart._doc, userId: userAuth._id };
    },

    updateCartItemQuantity: async (_, { productId, size, quantity }, context) => {
      const userAuth = await auth(context);
      const cart = await Cart.findOne({ userId: userAuth._id });

      if (!cart) {
        throw new UserInputError('Cart not found!');
      }

      const cartItem = cart.cartProducts.find(
        item => item.productId.toString() === productId && item.size === Number(size)
      );

      if (!cartItem) {
        throw new UserInputError('Item not found in cart!');
      }

      cartItem.quantity = Number(quantity);
      await cart.save();

      return { ...cart._doc, userId: userAuth._id };
    }
  },
};
