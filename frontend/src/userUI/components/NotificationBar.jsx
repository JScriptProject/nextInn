import React from "react";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { NotificationsContext } from "@user/context/NotificationsContext";

function NotificationBar() {
  const { notification } = useContext(NotificationsContext);
  return (
    notification.visible &&
    createPortal(
      <p className={notification.success ? "successModal" : "errorModal"}>
        {notification.message}
      </p>,
      document.getElementById("portal")
    )
  );
}
export default NotificationBar;
