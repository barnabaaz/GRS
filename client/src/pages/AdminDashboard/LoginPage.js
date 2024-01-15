import React from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../../components/AdminDashboard/Login";
const Login = ({ setAdminAuth }) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  let navigate = useNavigate();

  const [loginDetails, setLoginDetails] = React.useState({
    username: "",
    password: "",
    error: false,
    errorMessage: "",
  });

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const { username, password, error, errorMessage } = loginDetails;
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        const res = await fetch(
          `http://${window.location.hostname}:5000/admin/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginDetails),
          }
        );
        const parsedResponse = await res.json();
        console.log(parsedResponse);
        if (!parsedResponse.error) {
          setAdminAuth(true);
          setSuccess(true);
          setLoading(false);
          localStorage.setItem("token", parsedResponse.token);
          navigate("/admin");
        } else {
          setSuccess(false);
          setLoading(false);
          setLoginDetails({
            ...loginDetails,
            errorMessage: parsedResponse.message,
            error: true,
          });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <LoginComponent
      username={username}
      password={password}
      handleChange={handleChange}
      handleLogin={handleLogin}
      errorMessage={errorMessage}
      error={error}
      success={success}
      loading={loading}
    />
  );
};

export default Login;
