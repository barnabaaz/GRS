import React from "react";
import {
  Container,
  Paper,
  List,
  Typography,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SummarizeIcon from "@mui/icons-material/Summarize";
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
const ReportListPage = ({ result, user }) => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        width: "100%",
        pt: 3,
        pb: 3,
        alignContent: "center",
      }}
    >
      <Paper sx={{ p: 3, width: "100%" }}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Examination Reports
        </Typography>
        {result &&
          result.map((item, index) => (
            <Demo>
              <List>
                <ListItem
                  secondaryAction={
                    <ListItemText
                      aria-label="comments"
                      primary={"score"}
                      secondary={item.score}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <Link
                      to={`/result/${item._id}`}
                      style={{ display: "flex", textDecoration: "none" }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <SummarizeIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.subject}
                        secondary={`${item.term}  ${item.academicSession} `}
                      />
                    </Link>
                  </ListItemButton>
                </ListItem>
              </List>
            </Demo>
          ))}
      </Paper>
    </Container>
  );
};

export default ReportListPage;
