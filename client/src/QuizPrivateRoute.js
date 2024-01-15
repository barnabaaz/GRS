import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MainContext } from "./context";

const QuizPrivateRoute = ({ children }) => {
  const context = useContext(MainContext);
  const { handleStudentAuth, studentAuth } = context;
  React.useEffect(() => {
    handleStudentAuth();
  }, []);
  return studentAuth ? children : <Navigate to="/" />;
};

export default QuizPrivateRoute;
