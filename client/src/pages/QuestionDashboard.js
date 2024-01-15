import React from "react";
import Main from "../components/Main";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";

const Container = styled(Box)((theme) => ({
  display: "grid",
  height: "100vh",
  gridTemplateColumns: "250px 1fr",
  width: "100%",
  gridTemplateRows: "1fr 40px",
  gridTemplateAreas: ' "sidebar main" "sidebar footer" ',
}));
const QuestionDashboard = () => {
  const [time, setTime] = React.useState(null);
  const [counter, setCounter] = React.useState(0);
  const params = useParams();
  const getData = () => {
    fetch(
      `http://${window.location.hostname}:5000/result/get-time/${params.id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setTime(res);
        setCounter(res);
      })
      .then(() => console.log(time))
      .catch((err) => console.error(err.message));
  };
  React.useEffect(() => {
    getData();
  }, []);
  console.log(time);
  const updateTime = async () => {
    await fetch(`http://${window.location.hostname}:5000/result/update-time`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        currentTime: counter,
        examId: params.id,
      }),
    }).then((res) => res.json());
  };

  return (
    <Container>
      <SideBar />
      <Main
        time={time}
        counter={counter}
        setCounter={setCounter}
        updateTime={updateTime}
      />
      <Footer />
    </Container>
  );
};

export default QuestionDashboard;
