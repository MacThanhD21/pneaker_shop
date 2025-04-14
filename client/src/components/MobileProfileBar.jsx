import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../utils/customHooks';
import { sidebarLinks } from '../utils/constants';

const MobileProfileBar = () => {
  const { handleLogout } = useLogout();
  
  return (
    <div className="hidden md:flex w-full items-center border-b-2 border-gray-200">
      <nav className="w-full">
        <ul className="flex justify-between w-full">
          {sidebarLinks.map((links) => {
            const { name, path, id, handler } = links;
            return (
              <li key={id} className="relative group">
                <NavLink
                  to={path}
                  onClick={() => handler && handleLogout()}
                  className={({ isActive }) => 
                    `px-4 py-2 text-sm font-medium transition-colors duration-200
                    ${isActive 
                      ? 'text-pink-500' 
                      : 'text-gray-600 hover:text-pink-500'
                    }`
                  }
                >
                  {name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform scale-x-0 
                    transition-transform duration-200 group-hover:scale-x-100" />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MobileProfileBar;
