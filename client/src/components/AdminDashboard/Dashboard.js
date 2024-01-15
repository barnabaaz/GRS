import React from "react";
import { styled } from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Typography, Box, Card } from "@mui/material";
import Chart from "react-apexcharts";
import { AccountBoxOutlined } from "@mui/icons-material";

const Container = styled(Box)(({ theme }) => ({
  display: "block",
  alignContent: "center",
  justifyContent: "center",
}));

const CardContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridGap: 20,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const StyledCardContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridColumnGap: 20,
  gridRowGap: 20,
  gridTemplateRows: "1fr 1fr",
  gridTemplateColumns: "1fr 1fr",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr ",
  },
}));
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  borderRadius: "15px",

  padding: "20px",
  position: "relative",
  color: "#455560",
  overflow: " hidden",
  transition: "color .5s ease 0s",
  zIndex: 1,
  alignItems: "center",

  "&::before": {
    content: "close-quote",
    width: "100%",
    paddingTop: "100%",
    position: "absolute",
    background: "#6c9668",

    borderRadius: "50%",
    left: "-50%",
    top: 0,
    transform: "scale(0)",
    transition: "transform .8s ease 0s",
  },
  "&:hover::before": {
    transform: "scale(3)",
  },
  "&:hover": {
    color: "white",
  },
}));
const StatusCardIcon = styled(Box)(() => ({
  display: "flex",
  marginRight: "30px",
  color: "#455560",

  alignItems: "center",
  zIndex: 1,
  justifyContent: "center",
}));
const StatusCardText = styled(Box)(() => ({
  zIndex: 1,
}));
const ChartContainer = styled(Card)(({ theme }) => ({
  padding: "10px",
  borderRadius: "15px",
  [theme.breakpoints.down("md")]: {
    height: "250px",
  },
  [theme.breakpoints.down("sm")]: {},
}));
const TableContainer = styled("Box")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  marginTop: 30,
}));

const TableCard = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const Dashboard = () => {
  const chartOptions = {
    series: [
      {
        name: "Tot Expenditure",
        data: [40, 50, 60, 40, 90, 89, 45, 89, 90, 55],
      },
      {
        name: "Tot Income",
        data: [100, 50, 60, 40, 80, 90, 96, 98, 70, 63],
      },
    ],
    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: { background: "transparent" },
      dataLabels: { enabled: false },
      strokes: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "jan",
          "feb",
          "mar",
          "apr",
          "may",
          "jun",
          "jul",
          "aug",
          "sep",
          "oct",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };
  return (
    <Container>
      <CardContainer>
        <StyledCardContainer>
          <StyledCard elevation={4}>
            {" "}
            <StatusCardIcon>
              {" "}
              <AttachMoneyIcon sx={{ fontSize: "3rem" }} />{" "}
            </StatusCardIcon>{" "}
            <StatusCardText>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                2,567{" "}
              </Typography>

              <Typography variant="caption">Total Income</Typography>
            </StatusCardText>
          </StyledCard>
          <StyledCard elevation={4}>
            {" "}
            <StatusCardIcon>
              {" "}
              <AttachMoneyIcon sx={{ fontSize: "3rem" }} />{" "}
            </StatusCardIcon>{" "}
            <StatusCardText>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                2,567{" "}
              </Typography>

              <Typography variant="caption">Total Expenditure</Typography>
            </StatusCardText>
          </StyledCard>
          <StyledCard elevation={4}>
            <StatusCardIcon>
              {" "}
              <AccountBoxOutlined sx={{ fontSize: "3rem" }} />{" "}
            </StatusCardIcon>{" "}
            <StatusCardText>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                2,567{" "}
              </Typography>

              <Typography variant="caption">Registered Students</Typography>
            </StatusCardText>{" "}
          </StyledCard>
          <StyledCard elevation={4}>
            {" "}
            <StatusCardIcon>
              {" "}
              <AccountBoxOutlined sx={{ fontSize: "3rem" }} />{" "}
            </StatusCardIcon>{" "}
            <StatusCardText>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                2,567{" "}
              </Typography>

              <Typography variant="caption"> Registred Staff </Typography>
            </StatusCardText>{" "}
          </StyledCard>
        </StyledCardContainer>
        <ChartContainer>
          <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            height={"100%"}
          />
        </ChartContainer>
      </CardContainer>
      <TableContainer>
        <TableCard>Hello</TableCard>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
