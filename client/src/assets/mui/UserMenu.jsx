import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogout } from '../../utils/customHooks';
import styled from 'styled-components';

const UserMenu = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { handleLogout } = useLogout();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <UserMenuContainer>
      <UserButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'false' : undefined}
        onClick={handleClick}
      >
        <PersonOutlineOutlinedIcon />
        <Username>{userInfo.username}</Username>
      </UserButton>
      <StyledMenu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <StyledMenuItem onClick={handleClose}>
          <StyledLink to='/profile'>Profile</StyledLink>
        </StyledMenuItem>
        {userInfo.isAdmin && (
          <StyledMenuItem onClick={handleClose}>
            <StyledLink to='/new-item'>Admin Panel</StyledLink>
          </StyledMenuItem>
        )}
        <StyledMenuItem onClick={handleLogout}>Logout</StyledMenuItem>
      </StyledMenu>
    </UserMenuContainer>
  );
};

const UserMenuContainer = styled.div`
  position: relative;
`;

const UserButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: #333;
  text-transform: none;
  font-weight: 500;
  font-size: 1rem;

  &:hover {
    background-color: var(--clr-mocha-hover);
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const Username = styled.span`
  font-family: 'Noto Sans Vietnamese', 'Roboto', sans-serif;
`;

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid #eee;
    margin-top: 8px;
    min-width: 180px;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  padding: 12px 20px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  color: #333;

  &:hover {
    background-color: var(--clr-mocha-hover);
    color: var(--clr-primary);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  display: block;
`;

export default UserMenu;
