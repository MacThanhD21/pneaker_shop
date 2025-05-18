import React, { useState, useEffect } from 'react';
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
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER);
  const dispatch = useDispatch();
  const { userInfo: currentUser } = useSelector((state) => state.user);

  const validate = (values) => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]+$/; // Allows letters and spaces
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Allows letters, numbers, and underscore

    if (!values.firstName) {
      errors.firstName = 'First name is required';
    } else if (!nameRegex.test(values.firstName)) {
      errors.firstName = 'First name can only contain letters and spaces';
    }

    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    } else if (!nameRegex.test(values.lastName)) {
      errors.lastName = 'Last name can only contain letters and spaces';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!values.username) {
      errors.username = 'Username is required';
    } else if (!usernameRegex.test(values.username)) {
      errors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    if (!values.shoeSize) {
      errors.shoeSize = 'Shoe size is required';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Validate on change for immediate feedback
    if (isSubmitting) { // Only validate on change if form has been submitted once
        setFormErrors(validate({ ...formData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
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
        // Handle server-side errors or other update errors
        setFormErrors({ ...errors, general: 'Failed to update profile. Please try again.' });
      }
    }
  };
  
  // Re-validate when formData changes if isSubmitting is true
  // This helps to clear errors as user types
  useEffect(() => {
    if (isSubmitting) {
      setFormErrors(validate(formData));
    }
  }, [formData, isSubmitting]);

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
              className={`w-full px-4 py-2.5 text-base border rounded-md focus:outline-none focus:ring-2 ${formErrors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-rose-200 focus:ring-rose-500'}`}
              placeholder="Enter your first name"
            />
            {formErrors.firstName && <p className="text-xs text-red-500">{formErrors.firstName}</p>}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-rose-800">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-base border rounded-md focus:outline-none focus:ring-2 ${formErrors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-rose-200 focus:ring-rose-500'}`}
              placeholder="Enter your last name"
            />
            {formErrors.lastName && <p className="text-xs text-red-500">{formErrors.lastName}</p>}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-rose-800">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-base border rounded-md focus:outline-none focus:ring-2 ${formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-rose-200 focus:ring-rose-500'}`}
              placeholder="Enter your email"
            />
            {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-rose-800">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-base border rounded-md focus:outline-none focus:ring-2 ${formErrors.username ? 'border-red-500 focus:ring-red-500' : 'border-rose-200 focus:ring-rose-500'}`}
              placeholder="Enter your username"
            />
            {formErrors.username && <p className="text-xs text-red-500">{formErrors.username}</p>}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-rose-800">Shoe Size(US)</label>
            <select
              name="shoeSize"
              value={formData.shoeSize}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-base border rounded-md focus:outline-none focus:ring-2 ${formErrors.shoeSize ? 'border-red-500 focus:ring-red-500' : 'border-rose-200 focus:ring-rose-500'}`}
            >
              <option value="">Select size</option>
              {shoeSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {formErrors.shoeSize && <p className="text-xs text-red-500">{formErrors.shoeSize}</p>}
          </div>
          {formErrors.general && <p className="col-span-2 text-sm text-red-600 text-center">{formErrors.general}</p>}
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
