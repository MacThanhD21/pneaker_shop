import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../assets/mui/Loading';
import EditingShipping from './EditingShipping';

const UserShipping = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo, isLoading } = useSelector((state) => state.user);

  const { city, address, postalCode, phoneNumber, country } =
    userInfo?.shippingAddress || '';

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      {isEditing ? (
        <EditingShipping
          toggleEdit={toggleEdit}
          title='Shipping Update'
          userInfo={userInfo}
        />
      ) : (
        <div className="flex w-[80%] flex-col p-8 mx-12 my-8 bg-white rounded-lg shadow-sm border border-rose-100/50">
          <div className="flex w-full justify-between items-center pb-4 border-b border-rose-200/50">
            <h2 className="text-2xl font-bold text-rose-800">Shipping Info</h2>
            <button 
              onClick={toggleEdit}
              className="w-[10%] h-10 bg-rose-800 text-white rounded-md transition-all duration-300 hover:bg-rose-700 text-sm tracking-wide md:w-[25%]"
            >
              Edit
            </button>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-2 gap-6 mt-6 md:grid-cols-1">
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-rose-800">Address</h3>
                <p className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md">
                  {address || 'Not defined yet'}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-rose-800">City</h3>
                <p className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md">
                  {city || 'Not defined yet'}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-rose-800">State/Region</h3>
                <p className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md">
                  {country || 'Not defined yet'}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-rose-800">Zip/Postal Code</h3>
                <p className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md">
                  {postalCode || 'Not defined yet'}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-rose-800">Phone Number</h3>
                <p className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md">
                  {phoneNumber || 'Not defined yet'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserShipping;
