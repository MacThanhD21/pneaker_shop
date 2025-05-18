import { UserInputError } from 'apollo-server-express';
import User from '../../models/User.js';
import { auth } from '../../utils/auth.js';
import fetch from 'node-fetch';

import {
  loginInputValidator,
  registerInputValidator,
} from '../../utils/vaildators.js';

const RECAPTCHA_SECRET_KEY = '6Lfflj4rAAAAAGBRKGVOa-GtPSLhsYBM0Uj6qU4E';
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

const isPotentiallyMalicious = (value) => {
  if (typeof value !== 'string' || !value.trim()) return false;

  const val = value.toLowerCase().trim();
  const pattern = /\b(select|update|delete|insert|drop|exec|union|alter|create|truncate)\b|('|--|#|;|\/\*|\*\/|%27|%23|=)/i;
  const logic = /('|")\s*(or|and)\s*[\w\d]+\s*=\s*[\w\d]+/i;
  return pattern.test(val) || logic.test(val);
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
      { registerInput: { username, email, password, confirmedPassword }, recaptchaToken }
    ) => {
      // First verify the captcha token
      const isCaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!isCaptchaValid) {
        throw new UserInputError('CAPTCHA verification failed', {
          errors: {
            captcha: 'CAPTCHA verification failed. Please try again.',
          },
        });
      }
      
      // Kiểm tra đầu vào có dấu hiệu tấn công
      if (
        [username, email, password, confirmedPassword].some(isPotentiallyMalicious)
      ) {
        throw new UserInputError('Malicious input detected', {
          errors: {
            general:
              'Your input contains potentially dangerous characters or SQL keywords.',
          },
        });
      }
    
      // Validate chuẩn (định dạng, logic, độ dài,...)
      const { valid, errors } = registerInputValidator(
        username,
        email,
        password,
        confirmedPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
    
      // Kiểm tra tồn tại
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
    
      // Tạo mới
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
    
    login: async (_, { username, password, recaptchaToken }) => {
      // First verify the captcha token
      const isCaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!isCaptchaValid) {
        throw new UserInputError('CAPTCHA verification failed', {
          errors: {
            captcha: 'CAPTCHA verification failed. Please try again.',
          },
        });
      }
    
      // Kiểm tra dấu hiệu tấn công
      if ([username, password].some(isPotentiallyMalicious)) {
        throw new UserInputError('Malicious input detected', {
          errors: {
            general: 'Invalid login credentials.',
          },
        });
      }
    
      // Validate logic nhập liệu
      const { valid, errors } = loginInputValidator(username, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
    
      // Kiểm tra người dùng
      const user = await User.findOne({ username }).select('+password');
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('No user ', { errors });
      }
    
      // So sánh mật khẩu
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

    updateRoleUser: async (
      _,
      { userId, isAdmin },
    ) => {
      const user = await User.findById(userId);

      if (!user) {
        throw new UserInputError('User not found');
      }
      else{
        user.isAdmin = isAdmin;
        await user.save();
        return {
          ...user._doc,
          id: user._id,
        };
      }
    },

    // Delete user
    deleteUser: async (_, { userId }, context) => {
      const userAuth = await auth(context);
      
      // Check if user is admin or deleting their own account
      if (!userAuth.isAdmin && userAuth._id.toString() !== userId) {
        throw new UserInputError('Not authorized to delete this user');
      }

      const user = await User.findById(userId);
      if (!user) {
        throw new UserInputError('User not found');
      }

      await User.findByIdAndDelete(userId);
      return {
        id: userId,
        message: 'User deleted successfully'
      };
    },

    // addFullUserInformation: async (_, {
    //   userInput: {
    //     username,
    //     email,
    //     firstName,
    //     lastName,
    //     password,
    //     confirmedPassword,
    //   }
    // }) => {
    //   const existUser = await User.findOne({ username });

    //   if (existUser) {
    //     throw new UserInputError('User is already exist', {
    //       errors: {
    //         username: 'Username is already exist',
    //       },
    //     });
    //   }

    //   const newUser = new User({
    //     username,
    //     email,
    //     firstName,
    //     lastName,
    //     password,
    //     confirmedPassword,
    //   });
    //   const res = await newUser.save();

    //   return {
    //     ...res._doc,
    //     id: res._id,
    //     token: res.createJWT(),
    //   };
    // }
    
  },
};
