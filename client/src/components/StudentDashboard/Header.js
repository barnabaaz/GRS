import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import AccountMenu from "../AccountMenu";
import { useNavigate } from "react-router-dom";
import { FormatAlignJustifyOutlined } from "@mui/icons-material";

const Container = styled(Box)(({ theme }) => ({
  height: "70px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #999",
}));

const Header = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Container>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Dashboard
        </Typography>
      </Box>
      <AccountMenu handleLogOut={handleLogOut} />
    </Container>
  );
};

export default Header;
