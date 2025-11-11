import React, { createContext, useState } from 'react'

const NotificationContext = createContext();

export function NotificationContextProvider({children}) {
  const [notification, setNotification] = useState({success:false, message:""})
    return (
    <NotificationContext value={{notification, setNotification}}>
      {children}
    </NotificationContext>
  )
}
