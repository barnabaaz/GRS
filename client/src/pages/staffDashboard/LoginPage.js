import React from "react";
import Login from "../../components/StaffDashboard/Login";
import { useNavigate } from "react-router-dom";
const LoginPage = ({ setStaffAuth }) => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = React.useState({
    username: "",
    password: "",
    error: false,
    errorMessage: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const handleChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };
  const { username, password, error, errorMessage } = loginDetails;
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!loading) {
      setLoading(true);
      try {
        const res = await fetch(
          `http://${window.location.hostname}:5000/staff/login`,
          {
            headers: { "Content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );
        const parsedResponse = await res.json();
        if (parsedResponse.token) {
          setStaffAuth(true);
          setLoading(false);
          setSuccess(true);
          localStorage.setItem("token", parsedResponse.token);
          navigate("/staff");
        } else {
          setLoading(false);
          setLoginDetails({
            ...loginDetails,
            error: true,
            errorMessage: parsedResponse.message,
          });
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  };
  return (
    <Login
      handleLogin={handleLogin}
      username={username}
      password={password}
      error={error}
      errorMessage={errorMessage}
      handleChange={handleChange}
      loading={loading}
      success={success}
    />
  );
};

export default LoginPage;
