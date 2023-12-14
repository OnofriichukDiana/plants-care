import { useState } from "react";

const useNotification = () => {
  const [notification, setNotification] = useState<any>(null);

  const showNotification = (message: any, type: any) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return { notification, showNotification };
};

export default useNotification;
