import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { MainContext } from "../../context";
import iconImage from "../../utils/icon.png";
import List from "@mui/material/List";

import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";
import AnalyticsTwoToneIcon from "@mui/icons-material/AnalyticsTwoTone";
import Dashboard from "@mui/icons-material/DashboardCustomizeOutlined";

import { NavLink } from "react-router-dom";

import ComputerIcon from "@mui/icons-material/PeopleAltTwoTone";
const Container = styled(Paper)(({ theme }) => ({
  display: "grid",
  color: "white",
  gridTemplateRows: "150px 1fr 1fr",
  gridGap: "30px",
  gridArea: "sidebar",
  height: "100%",
  left: 0,
  paddingTop: "20px",
  position: "fixed",
  width: "250px",
  overflowY: "auto",
  background: "#6c9668",
  overflowX: "hidden",
  justifyContent: "space-evenly",
  [theme.breakpoints.down("md")]: {
    left: "-250px",
  },
}));

const StyledNavLinked = styled(NavLink)(({ theme, isActive }) => ({
  textDecoration: "none",
  color: "white",
  display: "flex",
  justifyContent: "flex-start",
  verticalAlign: "middle",
  position: "relative",
  alignItems: "center",
  width: "100%",
  padding: "16px 10px",

  borderRadius: "10px",
}));
const ProfileContainer = styled(Paper)(({ theme }) => ({
  height: "150px",
  width: "150px",
  background: "transparent",
  border: "5px solid #90c273",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& img": {
    height: "100%",
    width: "100%",
  },
}));

const Sidebar = () => {
  const context = React.useContext(MainContext);
  const { userId, arrayBufferToBase64 } = context;

  return (
    <Container elevation={5}>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ProfileContainer
          elevation={4}
          // style={{
          //   borderRadius: "50%",
          //   backgroundImage: `url(data:${
          //     userId.image.img.contentType
          //   };base64, ${arrayBufferToBase64(userId.image.img.data.data)})`,
          //   backgroundPosition: "center",
          //   backgroundSize: "contain",
          //   backgroundRepeat: "no-repeat",
          // }}
        >
          <img
            src={`data:${userId && userId.image.img.contentType};base64, ${
              userId && arrayBufferToBase64(userId.image.img.data.data)
            }`}
            alt="profile"
          />
        </ProfileContainer>
      </Box>

      <List
        sx={{ width: "100%" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     Nested List Items
        //   </ListSubheader>
        // }
      >
        <StyledNavLinked
          to="/student/"
          style={({ isActive }) => ({
            backgroundColor: isActive && "#90c273",
          })}
        >
          <Dashboard sx={{ color: "white", mr: 4 }} />
          <Typography> Dashboard</Typography>
        </StyledNavLinked>

        <StyledNavLinked
          to="/student/report"
          style={({ isActive }) => ({
            backgroundColor: isActive && "#90c273",
          })}
        >
          <AnalyticsTwoToneIcon sx={{ color: "white", mr: 4 }} />
          <Typography> Reports</Typography>
        </StyledNavLinked>
        <StyledNavLinked
          to="/student/cbt"
          style={({ isActive }) => ({
            backgroundColor: isActive && "#90c273",
          })}
        >
          <ComputerIcon sx={{ color: "white", mr: 4 }} />
          <Typography> CBT Test</Typography>
        </StyledNavLinked>
        <StyledNavLinked
          to="/student/printOut"
          style={({ isActive }) => ({
            backgroundColor: isActive && "#90c273",
          })}
        >
          <PrintTwoToneIcon sx={{ color: "white", mr: 4 }} />
          <Typography> PrintOuts </Typography>
        </StyledNavLinked>
      </List>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
        }}
      >
        <Stack>
          <img src={iconImage} alt="icon" height="120px" />
          <Button variant="contained" sx={{ bgcolor: "#f99bc0", mt: 2 }}>
            SignOut
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Sidebar;
