/* eslint-disable no-undef */
import React, { useEffect } from 'react';

function App() {
  let faceioInstance = null;

  useEffect(() => {
    const faceIoScript = document.createElement('script');
    faceIoScript.src = '//cdn.faceio.net/fio.js';
    faceIoScript.async = true;
    faceIoScript.onload = () => faceIoScriptLoaded();
    faceIoScript.onerror = (error) => console.error('Error loading FaceIO script:', error);
    document.body.appendChild(faceIoScript);

    return () => {
      document.body.removeChild(faceIoScript);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const faceIoScriptLoaded = () => {
    console.log(faceIO);
    if (faceIO && !faceioInstance) {
      faceioInstance = new faceIO('fioa0c76');
    }
  };

  const faceRegistration = async () => {
    try {
      const userInfo = await faceioInstance.enroll({
        locale: "auto",
        payload: {
          email: "demo",
          userId: "demo",
          username: "demo",
        },
      });
      console.log(userInfo);
      console.log('Unique Facial ID: ', userInfo.facialId);
      console.log('Enrollment Date: ', userInfo.timestamp);
      console.log('Gender: ', userInfo.details.gender);
      console.log('Age Approximation: ', userInfo.details.age);
    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
    }
  };

  const faceSignIn = async () => {
    try {
      console.log(faceioInstance);
      const userData = await faceioInstance.authenticate({
        locale: "auto",
      });
      console.log(userData);

      console.log('Unique Facial ID: ', userData.facialId);
      console.log('PayLoad: ', userData.payload);
    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
    }
  };

  const handleError = (errCode) => {
    // Handle errors as needed
    console.error('FaceIO Error:', errCode);
  };

  return (
    <div className="face-authentication-by-thanhphongdev flex fdc jcfc aic">
      <h1>Face Authentication using ReactJS & FaceIO</h1>
      <button className="action face-registration" onClick={faceRegistration}>Face Registration</button>
      <button className="action face-sign-in" onClick={faceSignIn}>Face Sign In</button>
    </div>
  );
}

export default App;
