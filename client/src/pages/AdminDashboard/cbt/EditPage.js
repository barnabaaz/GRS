import React, { useEffect } from "react";
import EditCbt from "../../../components/AdminDashboard/cbtText/EditCbt";
import { useParams } from "react-router-dom";
const EditPage = () => {
  const { id } = useParams();
  const [confirmDelete, setDelete] = React.useState(false);

  const [data, setData] = React.useState(null);

  const getData = async () => {
    fetch(
      `http://${window.location.hostname}:5000/question/get-question/${id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err.message));
  };
  useEffect(() => {
    getData();
  }, []);
  const handleClickOk = () => {
    setDelete(true);
  };
  return (
    <EditCbt
      data={data}
      id={id}
      getData={getData}
      confirmDelete={confirmDelete}
      setDelete={setDelete}
      handleClickOk={handleClickOk}
    />
  );
};

export default EditPage;



