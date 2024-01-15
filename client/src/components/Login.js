// import React from "react";
// import { styled } from "@mui/material/styles";
// import { Box, Typography, Paper, TextField, Button } from "@mui/material";
// import { Facebook, Twitter, Instagram } from "@mui/icons-material";
// import { Outlet } from "react-router-dom";
// const Container = styled(Box)(({ theme }) => ({
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr",
//   height: "100vh",
// }));

// const LeftContainer = styled(Box)(() => ({
//   display: "flex",
// }));
// const RightContainer = styled(Box)(() => ({
//   display: "flex",
// }));

// const LoginCard = styled(Paper)(({ theme }) => ({
//   height: "60%",
//   width: "350px",
//   display: "flex",
//   alignItems: "center",
//   flexDirection: "column",
//   justifyContent: "space-evenly",
//   padding: 10,
// }));
// const SocialIcons = styled(Box)(({ theme }) => ({
//   height: 30,
//   width: 30,
//   display: "flex",
//   borderRadius: "50%",
//   border: "1px solid #999",
//   justifyContent: "center",
//   alignItems: "center",
//   marginRight: 5,
// }));
// const Login = ({ email, password, handleChange, handleSubmit }) => {
//   return (
//     <Container>
//       <LoginCard elevation={3}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "column",
//           }}
//         >
//           {" "}
//           <Typography variant="h4">Login</Typography>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginTop: 2,
//             }}
//           >
//             {" "}
//             <SocialIcons>
//               <Twitter />
//             </SocialIcons>
//             <SocialIcons>
//               <Instagram />
//             </SocialIcons>
//             <SocialIcons>
//               <Facebook />
//             </SocialIcons>
//           </Box>
//         </Box>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             size="small"
//             label="Login"
//             name="email"
//             onChange={handleChange}
//             value={email}
//             fullWidth
//             margin="normal"
//             placeholder="Login"
//           />
//           <TextField
//             size="small"
//             label="password"
//             name="password"
//             value={password}
//             fullWidth
//             placeholder="Password"
//             margin="normal"
//             onChange={handleChange}
//             type="password"
//           />
//           <Box sx={{ justifySelf: "center", alignSelf: "center" }}>
//             <Button variant="contained" type="submit">
//               Login
//             </Button>
//           </Box>
//         </form>
//       </LoginCard>

//     </Container>
//   );
// };

// export default Login;
import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import icon from "../utils/icon.png";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    justifyContent: "center",
    alignItems: "center",
  },

  height: "100vh",
}));
const LeftContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyItems: "center",
  backgroundColor: "#6c9668",
  padding: 20,
  color: "white",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const SlideContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));
const RightContainer = styled(Box)(({ theme }) => ({
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  color: "#242222",
  marginTop: "20%",
  display: "flex",
  position: "relative",
}));
const ImageContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
}));

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "#242222",
}));

const Login = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container>
      <LeftContainer>
        <Typography variant="h3">Welcome to Genius Raisers</Typography>
      </LeftContainer>
      <RightContainer>
        <Box
          sx={{
            display: "flex",
            alignSelf: "flex-end",
            marginBottom: "10px",
            mr: 4,
            position: "relative",
          }}
        >
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="outlined"
            size="large"
          >
            Switch User
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              style: { width: "145px" },
            }}
          >
            <StyledLink to="">
              <MenuItem onClick={handleClose} sx={{ padding: "10px" }}>
                {" "}
                Student
              </MenuItem>
            </StyledLink>
            <StyledLink to="login-staff">
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                }}
              >
                staff
              </MenuItem>
            </StyledLink>
            <StyledLink to="/login-admin">
              <MenuItem onClick={handleClose}>Admin</MenuItem>
            </StyledLink>
          </Menu>
        </Box>
        <div>
          <ImageContainer>
            <img
              src={icon}
              alt="icon"
              style={{ display: "flex", height: "120px", width: "100%" }}
            />
          </ImageContainer>
        </div>
        <Outlet />
      </RightContainer>
    </Container>
  );
};

export default Login;
