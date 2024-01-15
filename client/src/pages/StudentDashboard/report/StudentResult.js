import React from "react";
import StudentResultComponent from "../../../components/StudentDashboard/report/StudentResult";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../../components/ErrorComponent";
import { MainContext } from "../../../context";
const StudentResult = () => {
  const context = React.useContext(MainContext);
  const { userId } = context;
  const params = useParams();
  const [result, setResult] = React.useState(null);
  const getResultData = () => {
    fetch(`http://${window.location.hostname}:5000/result/${params.id}`)
      .then((res) => res.json())
      .then((res) => setResult(res));
  };
  React.useEffect(() => {
    getResultData();
  }, []);
  console.log(result);
  return (
    <>{result && <StudentResultComponent result={result} user={userId} />}</>
  );
};

export default StudentResult;
