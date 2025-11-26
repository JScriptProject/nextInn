import React, { createContext, useState } from 'react'

export const NotificationContext = createContext();

export function NotificationContextProvider({children}) {
  
  const [notification, setNotification] = useState({visible:false, success:false, message:""})
    return (
    <NotificationContext.Provider value={{notification, setNotification}}>
      {children}
    </NotificationContext.Provider>
  )
}
