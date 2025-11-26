import React, { createContext, useState } from 'react'

export const NotificationsContext = createContext();

export function NotificationsContextProvider({children}) {
  
  const [notification, setNotification] = useState({visible:false, success:false, message:""})
    return (
    <NotificationsContext.Provider value={{notification, setNotification}}>
      {children}
    </NotificationsContext.Provider>
  )
}
