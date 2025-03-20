import { cart } from './cartResolvers.js';
import { order } from './orderResolvers.js';
import { products } from './productResolvers.js';
import { users } from './userResolvers.js';
import { DateTimeResolver } from 'graphql-scalars';

export default {
  Date: DateTimeResolver,
  Query: {
    ...users.Query,
    ...products.Query,
    ...cart.Query,
    ...order.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...products.Mutation,
    ...cart.Mutation,
    ...order.Mutation,
  },
};
