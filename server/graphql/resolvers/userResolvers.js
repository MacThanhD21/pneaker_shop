import { UserInputError } from 'apollo-server-express';
import User from '../../models/User.js';
import { auth } from '../../utils/auth.js';
import fetch from 'node-fetch';

import {
  loginInputValidator,
  registerInputValidator,
} from '../../utils/vaildators.js';

const RECAPTCHA_SECRET_KEY = '6LdS6QQrAAAAACgNQ61zRWkGRbfcRoSCFbKhkgd9';
// Hàm xác thực reCAPTCHA
const verifyRecaptcha = async (token) => {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
};

export const users = {
  Query: {
    getUserById: async (_, {}, context) => {
      const user = await auth(context);
      return {
        ...user._doc,
        id: user._id,
        token: user.createJWT(),
      };
    },
    getAllUsers: async (_, {}, context) => {
      // Here we get all users
      try {
        const users = await User.find(); // Find all users
        return users.map((user) => ({
          ...user._doc,
          id: user._id,
          token: user.createJWT(),
        }));
      } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch users');
      }
    },
  },
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmedPassword } }
    ) => {
      const { valid, errors } = registerInputValidator(
        username,
        email,
        password,
        confirmedPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const existUser = await User.findOne({ username });
      const existEmail = await User.findOne({ email });
      if (existUser) {
        throw new UserInputError('User is already exist', {
          errors: {
            username: 'Username is already exist',
          },
        });
      } else if (existEmail) {
        throw new UserInputError('Email is already exist', {
          errors: {
            email: 'Email is already exist',
          },
        });
      }
      const newUser = new User({
        username,
        email,
        password,
      });
      const res = await newUser.save();

      return {
        ...res._doc,
        id: res._id,
        token: res.createJWT(),
      };
    },
    login: async (_, { username, password }) => {
      const { valid, errors } = loginInputValidator(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username }).select('+password');

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('No user ', { errors });
      }

      if (!(await user.comparePasswords(password))) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      return {
        ...user._doc,
        id: user._id,
        token: user.createJWT(),
      };
    },
    updateUser: async (
      _,
      {
        updateUserInput: {
          email,
          username,
          firstName,
          lastName,
          shoeSize,
          password,
          currentPassword,
        },
      },
      context
    ) => {
      const userAuth = await auth(context);
      const user = await User.findOne(userAuth);

      if (user) {
        user.email = email || user.email;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.username = username || user.username;
        user.shoeSize = shoeSize || user.shoeSize;
        if (password) {
          if (password.length < 6 || currentPassword.length < 6) {
            throw new UserInputError(
              'Password field must be minimum 6 letters'
            );
          }
          const isMatch = await user.comparePasswords(currentPassword);
          if (isMatch) {
            user.password = password || user.password;
          } else {
            throw new UserInputError('Invalid input');
          }
        }
      }
      await user.save();
      return {
        ...user._doc,
        id: user._id,
        token: user.createJWT(),
        isAdmin: user.isAdmin,
      };
    },
    updateShipping: async (
      _,
      {
        updateShippingInput: {
          city,
          postalCode,
          address,
          country,
          phoneNumber,
        },
      },
      context
    ) => {
      const user = await auth(context);
      if (user) {
        user.shippingAddress.city = city;
        user.shippingAddress.country = country;
        user.shippingAddress.address = address;
        user.shippingAddress.phoneNumber = phoneNumber;
        user.shippingAddress.postalCode = postalCode;
      }

      await user.save();
      return {
        ...user._doc,
        id: user._id,
        token: user.createJWT(),
      };
    },

    adminUpdateUser: async (
      _,
      {
        updateUserInput: {
          email,
          username,
          firstName,
          lastName,
          shoeSize,
          password,
          currentPassword,
          isAdmin,
          shippingAddress,
          orders,
          cart,
          wishlist,
          createdAt,
          updatedAt
        },
      },
      context
    ) => {
      const userAuth = await auth(context);
      const user = await User.findOne(userAuth);

      if (!user) {
        throw new UserInputError('User not found');
      }
// Check if username or email already exists if they're being changed
      if (username && username !== user.username) {
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
          throw new UserInputError('Username already exists');
        }
      }

      if (email && email !== user.email) {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
          throw new UserInputError('Email already exists');
        }
      }

      // Update basic fields
      user.email = email || user.email;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.username = username || user.username;
      user.shoeSize = shoeSize || user.shoeSize;
      user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;
      
      // Update shipping address if provided
      if (shippingAddress) {
        user.shippingAddress = {
          ...user.shippingAddress,
          ...shippingAddress
        };
      }

      // Update arrays if provided
      if (orders) user.orders = orders;
      if (cart) user.cart = cart;
      if (wishlist) user.wishlist = wishlist;
       // Handle password update
       if (password) {
        if (password.length < 6 || !currentPassword) {
          throw new UserInputError('Password must be at least 6 characters');
        }
        const isMatch = await user.comparePasswords(currentPassword);
        if (!isMatch) {
          throw new UserInputError('Current password is incorrect');
        }
        user.password = password;
      }

      // Update timestamps
      user.updatedAt = new Date();

      await user.save();
      return {
        ...user._doc,
        id: user._id,
        token: user.createJWT(),
      };
    },



    
  },
};
