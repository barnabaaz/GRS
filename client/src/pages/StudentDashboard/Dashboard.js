import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DashboardComponent from "../../components/StudentDashboard/Dashboard";
import { MainContext } from "../../context";
const Dashboard = () => {
  const context = React.useContext(MainContext);
  const [questionData, setQuestionData] = React.useState(null);
  const navigate = useNavigate();
  const { userId } = context;
  console.log(userId);
  const getScheduledExams = async () => {
    await fetch(
      `http://${window.location.hostname}:5000/result/get-Scheduled/${userId.studentClass}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setQuestionData(res);
        console.log(questionData + " hurray question data came through");
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getScheduledExams();
    console.log("i was called");
  }, []);

  const handleTakeTest = () => {
    fetch(`http://${window.location.hostname}:5000/result/setresult`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        studentId: userId._id,
        questionData,
        studentClass: userId.studentClass,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigate(`/quiz/${res}`);
      })
      .catch((err) => console.log(err));
  };
  console.log(questionData);
  return (
    <>
      <DashboardComponent
        handleTakeTest={handleTakeTest}
        questionData={questionData}
        userId={userId}
      />
    </>
  );
};

export default Dashboard;
