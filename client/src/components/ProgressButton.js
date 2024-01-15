import * as React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";

export default function CircularIntegration({
  loading,
  success,
  handleButtonClick,
  body,
  buttonType,
}) {
  //   const [loading, setLoading] = React.useState(false);
  //   const [success, setSuccess] = React.useState(false);

  const buttonSx = {
    width: "400px",
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  //   const handleButtonClick = () => {
  //     if (!loading) {
  //       setSuccess(false);
  //       setLoading(true);
  //       timer.current = window.setTimeout(() => {
  //         setSuccess(true);
  //         setLoading(false);
  //       }, 2000);
  //     }
  //   };

  return (
    <>
      <Button
        variant="contained"
        sx={buttonSx}
        disabled={loading}
        onClick={handleButtonClick}
        type={buttonType}
      >
        {body}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </>
  );
}
