import React, { createContext } from "react";

export const MainContext = createContext({});

export const ContextProvider = (props) => {
  const useAuth = UseProvidedAUth();
  return (
    <MainContext.Provider value={useAuth}>
      {props.children}
    </MainContext.Provider>
  );
};

const UseProvidedAUth = () => {
  const [userId, setUserId] = React.useState(null);
  const [studentAuth, setStudentAuth] = React.useState(true);
  const [adminAuth, setAdminAuth] = React.useState(true);
  const [staffAuth, setStaffAuth] = React.useState(true);
  const [allStudentData, setAllStudentData] = React.useState([]);
  const [allStaffData, setAllStaffData] = React.useState([]);

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };
  const getAllStudentData = async () => {
    try {
      await fetch(`http://${window.location.hostname}:5000/student/`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => setAllStudentData(data));
    } catch (error) {}
  };

  const handleAdminAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/verify-admin", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parsedResponse = await res.json();
      if (parsedResponse.status === true) {
        setAdminAuth(true);
        setUserId(parsedResponse.userId);
      } else setAdminAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleStaffAuth = async () => {
    try {
      const res = await fetch(
        `http://${window.location.hostname}:5000/staff/verify-staff`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const parsedResponse = await res.json();

      if (parsedResponse.status === true) {
        setStaffAuth(true);
        setUserId(parsedResponse.userId);
      } else setStaffAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleStudentAuth = async () => {
    try {
      const res = await fetch(
        `http://${window.location.hostname}:5000/student/verify-student`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const parsedResponse = await res.json();

      if (parsedResponse.status === true) {
        setStudentAuth(true);
        setUserId(parsedResponse.userId);
        console.log(userId);
      } else setStudentAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllStaffData = async () => {
    try {
      await fetch(`http://${window.location.hostname}:5000/staff/`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => setAllStaffData(data));
    } catch (error) {}
  };
  return {
    handleStaffAuth,
    handleAdminAuth,
    handleStudentAuth,
    studentAuth,
    userId,
    setUserId,
    adminAuth,
    setAdminAuth,
    setStaffAuth,
    staffAuth,
    setStudentAuth,
    arrayBufferToBase64,
    getAllStaffData,
    getAllStudentData,
    allStudentData,
    allStaffData,
  };
};
