import React from "react";
import { styled } from "@mui/material/styles";

import { Box, Button, Paper, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { MainContext } from "../context";
import AlertDialogue from "./ActionDialogue";

import { useNavigate } from "react-router-dom";
const Container = styled(Paper)(({ theme }) => ({
  gridArea: "sidebar",
  background: "#1B263B",
  color: "#fea82f ",
  display: "grid",
  borderRadius: 0,
}));
const ProfilePictureContainer = styled(Paper)(({ theme }) => ({
  border: "10px solid #1a2c4e",
  margin: 10,
  height: "250px",
}));
const Image = styled("img")(({ theme }) => ({
  display: "block",
  position: "relative",
  height: "100%",
  width: "100%",
}));
const SideBarInfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: " 0 20px",
}));

const LogOutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const Logo = styled(Paper)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  justifySelf: "center",
  height: 130,
  width: 130,
  borderRadius: "10px",
  backgroundColor: "#000000",
  color: "#ffffff",
}));

const SideBar = ({ userData, setIsAuthenticated, handleLogOut }) => {
  const context = React.useContext(MainContext);
  const { userId } = context;
  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <Container elevation={4}>
      <AlertDialogue
        dialogueTitle={"Logout"}
        contentText={"Are you sure you want to logout ?"}
        open={open}
        setOpen={setOpen}
        handleClickOk={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      />
      <ProfilePictureContainer elevation={4}>
        <Image
          src={`data:${userId && userId.image.img.contentType};base64, ${
            userId && arrayBufferToBase64(userId.image.img.data.data)
          }`}
          alt="profile "
        />
      </ProfilePictureContainer>
      <SideBarInfoContainer>
        <Box>
          <Typography variant="h6" sx={{ paddingBottom: 1 }}>
            {userId.firstName + " " + userId.lastName}
          </Typography>

          <Typography variant="h6" sx={{ paddingBottom: 1 }}>
            {userId.gender}
          </Typography>
          <Typography variant="h6" sx={{ paddingBottom: 1 }}>
            {userId.studentClass}
          </Typography>
        </Box>
      </SideBarInfoContainer>
      <Logo elevation={6}>
        <Box
          sx={{
            height: "140px",
            width: "140px",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" fontWeight={500} className="glowingText">
            <span>G</span>
            <span>R</span>
            <span>S</span>
          </Typography>
        </Box>
      </Logo>
      <LogOutContainer>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ background: "#FEA82F", color: "#000000" }}
        >
          <Logout /> Logout
        </Button>
      </LogOutContainer>
    </Container>
  );
};

export default SideBar;
