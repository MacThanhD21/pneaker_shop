import { useState, useEffect } from 'react';

const useProductNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // Load subscribers from localStorage
  useEffect(() => {
    const savedSubscribers = localStorage.getItem('newsletterSubscribers');
    if (savedSubscribers) {
      setSubscribers(JSON.parse(savedSubscribers));
    }
  }, []);

  // Load notifications from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('productNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  // Add new product notification
  const addProductNotification = (product) => {
    const newNotification = {
      id: Date.now(),
      product,
      timestamp: new Date().toISOString(),
      read: false
    };

    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem('productNotifications', JSON.stringify(updatedNotifications));

    // Simulate sending email to subscribers
    if (subscribers.length > 0) {
      console.log(`Sending notification about ${product.name} to ${subscribers.length} subscribers`);
      // In a real app, you would send emails here
    }
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('productNotifications', JSON.stringify(updatedNotifications));
  };

  // Get unread notifications count
  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  return {
    notifications,
    addProductNotification,
    markAsRead,
    getUnreadCount
  };
};

export default useProductNotification; 