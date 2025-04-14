import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBell } from 'react-icons/fa';
import useProductNotification from '../hooks/useProductNotification';

const ProductNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, getUnreadCount } = useProductNotification();
  const unreadCount = getUnreadCount();

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notificationId) => {
    markAsRead(notificationId);
  };

  return (
    <NotificationContainer>
      <NotificationButton onClick={toggleNotifications}>
        <FaBell />
        {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
      </NotificationButton>

      {isOpen && (
        <NotificationDropdown>
          <NotificationHeader>
            <h3>Thông báo mới</h3>
            <span>{unreadCount} chưa đọc</span>
          </NotificationHeader>

          <NotificationList>
            {notifications.length === 0 ? (
              <EmptyMessage>Không có thông báo mới</EmptyMessage>
            ) : (
              notifications.map(notification => (
                <NotificationItem 
                  key={notification.id}
                  unread={!notification.read}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <ProductImage src={notification.product.image} alt={notification.product.name} />
                  <NotificationContent>
                    <ProductName>{notification.product.name}</ProductName>
                    <NotificationTime>
                      {new Date(notification.timestamp).toLocaleString()}
                    </NotificationTime>
                  </NotificationContent>
                </NotificationItem>
              ))
            )}
          </NotificationList>
        </NotificationDropdown>
      )}
    </NotificationContainer>
  );
};

export default ProductNotification;

const NotificationContainer = styled.div`
  position: relative;
`;

const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #db7093;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 0.5rem;
`;

const NotificationHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
  }

  span {
    font-size: 0.9rem;
    color: #db7093;
  }
`;

const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${props => props.unread ? 'rgba(219, 112, 147, 0.05)' : 'transparent'};

  &:hover {
    background-color: rgba(219, 112, 147, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.3rem;
`;

const NotificationTime = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #666;
`; 