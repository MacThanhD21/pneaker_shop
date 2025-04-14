import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sidebarLinks, adminSidebarLinks } from '../utils/constants';
import { useLogout } from '../utils/customHooks';

const LeftSidebar = ({ admin }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { handleLogout } = useLogout();
  const mapValue = admin ? adminSidebarLinks : sidebarLinks;

  return (
    <div className="hidden md:block w-[30%] h-[75vh] bg-gradient-to-b from-rose-50 to-rose-100/50 rounded-lg shadow-sm border border-rose-100/50 transition-all duration-300">
      <div className="p-6">
        <h2 className="text-2xl font-medium text-rose-800 text-center tracking-wide">
          Hello {userInfo.firstName ? userInfo.firstName : userInfo.username}
        </h2>
      </div>
      
      <div className="flex flex-col space-y-2 px-4">
        {mapValue?.map((link) => {
          const { name, id, icon, path, handler } = link;
          return (
            <div key={id} className="w-full">
              <NavLink
                to={path}
                onClick={() => handler && handleLogout()}
                className={({ isActive }) => 
                  `flex items-center w-full p-3 rounded-lg transition-all duration-300
                  ${isActive 
                    ? 'bg-rose-800 text-white shadow-md' 
                    : 'text-rose-800 hover:bg-rose-200/50 hover:shadow-sm'
                  }`
                }
              >
                <span className="mr-3 text-lg">{icon}</span>
                <span className="font-medium">{name}</span>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;
