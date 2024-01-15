import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import { MainContext } from "../context";

const CardContainer = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  width: "100%",
  overflow: "hidden",
  justifyContent: "center",
  alignItems: "center",
}));
const Card = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  height: "350px",
  justifyItems: "center",
  width: "350px",
  padding: "20px",
}));
const ProfileImage = styled(Paper)(() => ({
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  backgroundColor: "#999",
}));
const ProfileCard = () => {
  const context = React.useContext(MainContext);
  const { userId } = context;
  return (
    <CardContainer>
      <Card elevation={4}>
        <ProfileImage elevation={4}></ProfileImage>
        <Box
          sx={{
            display: "flex",
            alignSelf: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography>First Name : {userId.firstName}</Typography>
          <Typography>Last NAme : {userId.lastName}</Typography>
          {userId.studentClass && (
            <Typography>First Name : {userId.studentClass}</Typography>
          )}
          {userId.gender && (
            <Typography>First Name : {userId.studentClass}</Typography>
          )}
        </Box>
      </Card>
    </CardContainer>
  );
};

export default ProfileCard;
