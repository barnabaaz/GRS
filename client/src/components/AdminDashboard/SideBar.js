import React from "react";
import { MainContext } from "../../context";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Stack,
  Typography,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Users from "@mui/icons-material/PeopleAltTwoTone";
import List from "@mui/material/List";
import Account from "@mui/icons-material/AccountBoxTwoTone";
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
  position: "relative",
  padding: "10px",
  overflowY: "auto",
  transform: "translateX(0)",
  transition: " 1s ease",
  background: "#6c9668",
  overflowX: "hidden",
  [theme.breakpoints.down("md")]: {
    position: "fixed",
    width: "250px",
    height: "100vh",
    zIndex: 100000,
    transform: "translateX(-250px)",
    transition: " 1s ease",
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
  padding: "16px 10px",

  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#335a1cac",
  },
}));
const ProfileContainer = styled(Paper)(({ theme }) => ({
  height: "150px",
  width: "150px",
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
  const [open, setOpen] = React.useState(false);
  const context = React.useContext(MainContext);
  const { arrayBufferToBase64, userId } = context;
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Container elevation={5}>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ProfileContainer elevation={4}>
          <img
            src={`data:${userId && userId.image.img.contentType};base64, ${
              userId && arrayBufferToBase64(userId.image.img.data.data)
            }`}
            alt="profile"
          />
        </ProfileContainer>
      </Box>
      <List
        sx={{}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     Nested List Items
        //   </ListSubheader>
        // }
      >
        <StyledNavLinked
          to="/admin/"
          style={({ isActive }) => ({
            backgroundColor: isActive && "#214d08ac",
          })}
        >
          <Dashboard sx={{ color: "white", mr: 4 }} />
          <Typography> Dashboard</Typography>
        </StyledNavLinked>

        <StyledNavLinked
          to="/admin/report"
          style={({ isActive }) => ({
            backgroundColor: isActive && "#214d08ac",
          })}
        >
          <AnalyticsTwoToneIcon sx={{ color: "white", mr: 4 }} />
          <Typography> Reports</Typography>
        </StyledNavLinked>
        <StyledNavLinked onClick={handleClick} to="#">
          <ListItemIcon>
            <Users sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </StyledNavLinked>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledNavLinked
              to={"/admin/student"}
              sx={{ pl: 4, pt: 1, pb: 1 }}
              style={({ isActive }) => ({
                backgroundColor: isActive && "#214d08ac",
              })}
            >
              <ListItemIcon>
                <Account sx={{ color: "white " }} />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </StyledNavLinked>
            <StyledNavLinked
              to={"/admin/admin"}
              sx={{ pl: 4, pt: 1, pb: 1 }}
              style={({ isActive }) => ({
                backgroundColor: isActive && "#214d08ac",
              })}
            >
              <ListItemIcon>
                <Account sx={{ color: "white " }} />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </StyledNavLinked>
            <StyledNavLinked
              to={"/admin/staff"}
              sx={{ pl: 4, pt: 1, pb: 1 }}
              style={({ isActive }) => ({
                backgroundColor: isActive && "#214d08ac",
              })}
            >
              <ListItemIcon>
                <Account sx={{ color: "white " }} />
              </ListItemIcon>
              <ListItemText primary="Staff" />
            </StyledNavLinked>
          </List>
        </Collapse>
        <StyledNavLinked
          to="/admin/cbt"
          style={({ isActive }) => ({
            backgroundColor: isActive && "#214d08ac",
          })}
        >
          <ComputerIcon sx={{ color: "white", mr: 4 }} />
          <Typography> CBT Test</Typography>
        </StyledNavLinked>
        <StyledNavLinked
          to="/admin/printouts"
          style={({ isActive }) => ({
            backgroundColor: isActive && "#214d08ac",
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
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {" "}
            Developed by BarnaDev{" "}
          </Typography>

          <Typography variant="body2"> copyright &copy; 2022 </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default Sidebar;
