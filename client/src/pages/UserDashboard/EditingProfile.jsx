import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_USER } from '../../graphql/Mutations/userMutations';
import { useMutation } from '@apollo/client';
import { updateUser } from '../../features/userSlice';
import Loading from '../../assets/mui/Loading';

const EditingProfile = ({ toggleEdit, title, userInfo }) => {
  const [formData, setFormData] = useState({
    firstName: userInfo.firstName || '',
    lastName: userInfo.lastName || '',
    email: userInfo.email || '',
    username: userInfo.username || '',
    shoeSize: userInfo.shoeSize || '',
  });

  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER);
  const dispatch = useDispatch();
  const { userInfo: currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateUserMutation({
        variables: {
          userId: currentUser.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          shoeSize: formData.shoeSize,
        },
      });

      if (data.updateUser) {
        dispatch(updateUser(data.updateUser));
        toggleEdit();
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Generate shoe sizes from 37 to 47
  const shoeSizes = Array.from({ length: 11 }, (_, i) => i + 37);

  return (
    <div className="flex w-[80%] flex-col p-8 mx-12 my-8 bg-white rounded-lg shadow-sm border border-rose-100/50">
      <div className="flex w-full justify-between items-center pb-4 border-b border-rose-200/50">
        <h2 className="text-2xl font-bold text-rose-800">{title}</h2>
        <button 
          onClick={toggleEdit}
          className="w-[10%] h-10 bg-rose-800 text-white rounded-md transition-all duration-300 hover:bg-rose-700 text-sm tracking-wide md:w-[25%]"
        >
          Cancel
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-6 md:grid-cols-1">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-rose-800">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-base border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-rose-800">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-base border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Enter your last name"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-rose-800">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-base border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-rose-800">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-base border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-rose-800">Shoe Size(US)</label>
            <select
              name="shoeSize"
              value={formData.shoeSize}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-base border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="">Select size</option>
              {shoeSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 bg-rose-800 text-white rounded-md transition-all duration-300 hover:bg-rose-700 text-base font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditingProfile;
