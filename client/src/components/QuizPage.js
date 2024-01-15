import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import SideBar from "./SideBar";
import Main from "./Main";
import Footer from "./Footer";
const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateAreas: " 'sidebar main' 'footer footer' ",
  gridTemplateRows: "1fr 40px",
  height: "100vh",
  overflow: "hidden",
}));
const Introduction = ({ setIsAuthenticated }) => {
  const [userData, setUserData] = React.useState(null);

  const getUserData = async () => {
    try {
      const res = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parsedResponse = await res.json();
      setUserData(parsedResponse);
    } catch (err) {
      console.error(err.message);
    }
  };
  React.useEffect(() => {
    getUserData();
  }, []);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Container>
      <SideBar />
      <Main />
      <Footer />
    </Container>
  );
};

export default Introduction;
