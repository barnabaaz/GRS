import React from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
const LoginPages = ({ setIsAuthenticated, isAuthenticated }) => {
  const [userLogin, setUserLogin] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userLogin),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.token) {
            console.log(res);
            console.log(isAuthenticated);
            setIsAuthenticated(true);
            localStorage.setItem("token", res.token);
            navigate("/");
          }
        });
    } catch (err) {
      console.error(err.message);
    }
  };
  const { email, password } = userLogin;
  return (
    <Login
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      email={email}
      password={password}
    />
  );
};

export default LoginPages;
