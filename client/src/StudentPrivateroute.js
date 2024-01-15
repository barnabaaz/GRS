import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MainContext } from "./context";
const StudentIndexPage = React.lazy(() =>
  import("./pages/StudentDashboard/Index")
);
const StudentPrivateroute = () => {
  const context = useContext(MainContext);
  const { handleStudentAuth, studentAuth } = context;

  React.useEffect(() => {
    handleStudentAuth();
  }, []);
  return studentAuth ? (
    <StudentIndexPage>
      <Outlet />
    </StudentIndexPage>
  ) : (
    <Navigate to="/" />
  );
};

export default StudentPrivateroute;
