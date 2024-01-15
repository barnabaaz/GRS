import React from "react";
import { MainContext } from "../../../context";
import { styled } from "@mui/material/styles";
import { Box, Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Container = styled(Box)(({ theme }) => ({
  display: "grid",
}));
const StudentComponent = () => {
  const navigate = useNavigate();
  const context = React.useContext(MainContext);
  const { allStudentData, getAllStudentData } = context;
  React.useEffect(() => {
    getAllStudentData();
  }, [allStudentData]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "FIRST NAME", width: 150 },
    { field: "lastName", headerName: "LAST NAME", width: 150 },
    { field: "firstName", headerName: "FIRST NAME", width: 150 },
    { field: "gender", headerName: "GENDER ", width: 100 },
    { field: "class", headerName: "CLASS", width: 150 },
    {
      field: "action1",
      headerName: "EDIT",
      width: 100,
      renderCell: (params) => <> {params.value} </>,
    },
    {
      field: "action2",
      headerName: "DELETE",
      width: 100,
      renderCell: (params) => <> {params.value} </>,
      editable: true,
    },
    {
      field: "image",
      headerName: "PROFILE",
      width: 100,
      renderCell: (params) => <img src={params.value} alt="alt" />,
    },
  ];
  const actionButton1 = (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button variant="contained" sx={{ mr: 1 }}>
        <Edit />
      </Button>
    </div>
  );

  const rows = allStudentData.map((data, index) => ({
    id: index + 1,
    firstName: data.firstName,
    lastName: data.lastName,
    middleName: data.middleName,
    gender: data.gender,
    class: `primary ${data.studentClass}`,
    image: data.image,
    action1: actionButton1,
    action2: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" sx={{ mr: 1 }} key={index}>
          <Delete />
        </Button>
      </div>
    ),
  }));
  const handleCreateStudent = () => {
    console.log("i was clicked ");
    navigate("create-student");
  };
  return (
    <Container>
      <Box sx={{ display: "flex", justifySelf: "flex-end", mb: 2 }}>
        <Button size="large" variant="contained" onClick={handleCreateStudent}>
          {" "}
          Create New Student{" "}
        </Button>
      </Box>
      <Paper style={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </Paper>
    </Container>
  );
};

export default StudentComponent;
