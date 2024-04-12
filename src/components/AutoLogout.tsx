import React, { useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



const useAutoLogout = (timeoutDuration: number, logoutFunction: () => void) => {
  const [showPopup, setShowPopup] = useState(false);

  const logoutTimerRef = useRef<number | null>(null);
  

  useEffect(() => {
    const handleInactivity = () => {
      setShowPopup(false);

      // if (!userWantsToStay) {
      //   logoutFunction(); // Call the logout function passed as a parameter
      // } else {
      //   resetInactivityTimer();
      // }
    };

    const resetInactivityTimer = () => {
      if (logoutTimerRef.current !== null) {
        clearTimeout(logoutTimerRef.current);
      }
      logoutTimerRef.current = window.setTimeout(handleInactivity, timeoutDuration);
    };

    const activityDetected = () => resetInactivityTimer();
    window.addEventListener('mousemove', activityDetected);
    window.addEventListener('keydown', activityDetected);

    resetInactivityTimer();

    return () => {
      <Popup disabled={showPopup}>
        {
          <div className='content'>
            Welcome to GFG!!!
          </div>
        }
      </Popup>;


      window.removeEventListener('mousemove', activityDetected);
      window.removeEventListener('keydown', activityDetected);
      if (logoutTimerRef.current !== null) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [timeoutDuration, logoutFunction]);
};

export default useAutoLogout;