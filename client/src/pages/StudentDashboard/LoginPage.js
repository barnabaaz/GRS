import React from "react";
import Login from "../../components/StudentDashboard/Login";
import { useNavigate } from "react-router-dom";
const LoginPage = ({ setStudentAuth }) => {
  let navigate = useNavigate();

  const [loginDetails, setLoginDetails] = React.useState({
    username: "",
    password: "",
    error: false,
    errorText: "",
  });
  const { username, password } = loginDetails;
  const handleChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `http://${window.location.hostname}:5000/student/login`,

        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const parsedResponse = await res.json();

      if (parsedResponse.token) {
        console.log("i was called");

        setStudentAuth(true);
        // setSuccess(true);
        // setLoading(false);
        localStorage.setItem("token", parsedResponse.token);
        navigate("/student");
      } else {
        // setSuccess(false);
        // setLoading(false);
        setLoginDetails({
          ...loginDetails,
          errorText: parsedResponse.message,
          error: true,
        });
      }
    } catch (err) {}
  };
  return (
    <Login
      handleChange={handleChange}
      handleLogin={handleLogin}
      loginDetails={loginDetails}
    />
  );
};

export default LoginPage;
