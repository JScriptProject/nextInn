import React from 'react'
import { createPortal } from 'react-dom'
import { useContext } from 'react';
import { NotificationContext } from '../context/notificationContext';

function NotificationBar() {
  const { notification } = useContext(NotificationContext);
  return notification.visible && createPortal(<p className={notification.success ? "successModal" : "errorModal"}>{notification.message}</p>,document.getElementById('portal'));
}
export default NotificationBar