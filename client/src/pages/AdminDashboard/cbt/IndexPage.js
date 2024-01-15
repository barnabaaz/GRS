import React from "react";

import IndexComponent from "../../../components/AdminDashboard/cbtText/IndexPage";
const Index = () => {
  const [allQuestions, setAllQuestions] = React.useState([]);
  const getAllQuestions = async () => {
    await fetch(`http:${window.location.hostname}:5000/questions`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setAllQuestions(data));
  };
  React.useEffect(() => {
    getAllQuestions();
  }, [allQuestions]);
  return <IndexComponent allQuestions={allQuestions} />;
};

export default Index;
