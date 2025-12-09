import React, { createContext, useState } from 'react'

export const NotificationsContext = createContext();

export function NotificationsContextProvider({children}) {
  
  const [notification, setNotification] = useState({visible:false, success:false, message:""});

  const showNotification = (visibleValue, successValue, messageValue) => {
    setNotification({
      visible: visibleValue,
      success: successValue,
      message: messageValue,
    });
    setTimeout(() => {
      setNotification({ visible: false, success: false, message: "" });
    }, 3000);
  };
    return (
      <NotificationsContext.Provider
        value={{ notification, setNotification, showNotification }}
      >
        {children}
      </NotificationsContext.Provider>
    );
}
