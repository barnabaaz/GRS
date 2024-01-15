import React from "react";
import ReportListIndex from "../../../components/StudentDashboard/report/ReportList";
import { MainContext } from "../../../context";
const ReportList = () => {
  const [result, setResult] = React.useState(null);
  const context = React.useContext(MainContext);
  const { userId } = context;
  console.log(userId._id);
  const getResult = () => {
    fetch(
      `http://${window.location.hostname}:5000/result/student/${userId._id}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setResult(res);
      });
  };
  React.useEffect(() => {
    getResult();
  }, []);

  return <ReportListIndex result={result} user={userId} />;
};

export default ReportList;
