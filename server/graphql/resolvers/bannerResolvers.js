import Banner from '../../models/Banner.js';
import { UserInputError } from 'apollo-server';
import { auth } from '../../utils/auth.js';

export const banners = {
  Query: {
    getAllBanners: async () => {
      try {
        const banners = await Banner.find().sort({ order: 1 });
        return banners;
      } catch (error) {
        throw new UserInputError('Error fetching banners');
      }
    },
    getActiveBanners: async () => {
      try {
        const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
        return banners;
      } catch (error) {
        throw new UserInputError('Error fetching active banners');
      }
    }
  },
  Mutation: {
    createBanner: async (_, { input: { image, title, description, link, order } }, context) => {
      const userAuth = await auth(context);
      
      if (!userAuth.isAdmin) {
        throw new UserInputError('Must be an admin to create a banner');
      }

      try {
        const newBanner = new Banner({
          image,
          title,
          description,
          link,
          order: order || 0
        });

        const savedBanner = await newBanner.save();
        return savedBanner;
      } catch (error) {
        throw new UserInputError('Error creating banner');
      }
    },

    updateBanner: async (_, { id, input: { image, title, description, link, isActive, order } }, context) => {
      const userAuth = await auth(context);
      
      if (!userAuth.isAdmin) {
        throw new UserInputError('Must be an admin to update a banner');
      }

      try {
        const banner = await Banner.findById(id);
        if (!banner) {
          throw new UserInputError('Banner not found');
        }

        if (image) banner.image = image;
        if (title) banner.title = title;
        if (description !== undefined) banner.description = description;
        if (link !== undefined) banner.link = link;
        if (isActive !== undefined) banner.isActive = isActive;
        if (order !== undefined) banner.order = order;

        const updatedBanner = await banner.save();
        return updatedBanner;
      } catch (error) {
        throw new UserInputError('Error updating banner');
      }
    },

    deleteBanner: async (_, { id }, context) => {
      const userAuth = await auth(context);
      
      if (!userAuth.isAdmin) {
        throw new UserInputError('Must be an admin to delete a banner');
      }

      try {
        const banner = await Banner.findByIdAndDelete(id);
        if (!banner) {
          throw new UserInputError('Banner not found');
        }
        return banner;
      } catch (error) {
        throw new UserInputError('Error deleting banner');
      }
    }
  }
};
