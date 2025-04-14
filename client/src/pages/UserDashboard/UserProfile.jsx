import { PasswordModal } from '../../assets/mui/PasswordModal';
import React, { useState } from 'react';
import EditingProfile from './EditingProfile';
import { useSelector } from 'react-redux';
import Loading from '../../assets/mui/Loading';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo, isLoading } = useSelector((state) => state.user);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      {isEditing ? (
        <EditingProfile
          toggleEdit={toggleEdit}
          title='Profile Update'
          userInfo={userInfo}
        />
      ) : (
        <div className="flex w-[80%] flex-col p-8 mx-12 my-8 bg-white rounded-lg shadow-sm border border-rose-100/50">
          <div className="flex w-full justify-between items-center pb-4 border-b border-rose-200/50">
            <h2 className="text-2xl font-bold text-rose-800">Profile</h2>
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
                <h3 className="text-sm font-medium text-rose-800">First Name</h3>
                <p className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md">
                  {userInfo.firstName || 'Not defined yet'}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-rose-800">Last Name</h3>
                <p className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md">
                  {userInfo.lastName || 'Not defined yet'}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-rose-800">Email Address</h3>
                <p className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md">
                  {userInfo.email}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-rose-800">Shoe Size(US)</h3>
                <p className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md">
                  {userInfo.shoeSize || 'Not defined yet'}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-rose-800">Username</h3>
                <p className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md">
                  {userInfo.username}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-rose-800">
                  <PasswordModal />
                </h3>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
