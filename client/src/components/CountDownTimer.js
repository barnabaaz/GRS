// import React from "react";
// import { Typography } from "@mui/material";

// const CountDownTimer = ({ hrsminsecs, handleLogOut, cuurentTime }) => {
//   const { hours = 0, minutes = 0, seconds = 0 } = hrsminsecs;
//   const [[hrs, mins, secs], setTime] = React.useState([
//     hours,
//     minutes,
//     seconds,
//   ]);

//   const [timerStarted, setTimerStarted] = React.useState(false);

//   const tick = () => {
//     if (mins === 0 && hrs === 0 && secs === 0) {
//       setTime([hours, minutes, seconds]);
//     } else if (mins === 0 && secs === 0) {
//       setTime([hrs - 1, 59, 59]);
//     } else if (secs === 0) {
//       setTime([hrs, mins - 1, 59]);
//     } else {
//       setTime([hrs, mins, secs - 1]);
//     }
//   };
//   const saveTime = async () => {
//     await fetch("http://localhost:5000/auth/getTime", {
//       method: "POST",
//       body: JSON.stringify(cuurentTime),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((response) => response.json())
//       .then((response) => console.log(response));
//   };

//   React.useEffect(() => {
//     const timer = setInterval(tick(), 1000);
//     return () => clearInterval(timer);
//   });

//   return (
//     <>
//       <Typography>
//         {" "}
//         Time Left:{`${hrs.toString().padStart(2, "0")}`}:
//         {`${mins.toString().padStart(2, "0")}`}:
//         {`${secs.toString().padStart(2, "0")}`}
//       </Typography>
//     </>
//   );
// };

// export default CountDownTimer;
import React from "react";
import useCountDown from "react-countdown-hook";
import Typography from "@mui/material/Typography";
import propTypes from "prop-types";

const CountDownTimer = ({ time = 0, handleTimeUp }) => {
  const [timeStarted, setTimeStarted] = React.useState(false);
  const initialTime = time * 1000 * 60;

  const interval = 1000;

  // const secDiff = timeDiff / 1000; //in s
  // const minDiff = timeDiff / 60 / 1000; //in minutes
  // const hDiff = timeDiff / 3600 / 1000; //in hours

  function msToHMS(ms) {
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    // 2- Extract hours:
    const hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    return (
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  }

  const [timeLeft, actions] = useCountDown(initialTime, interval);

  React.useEffect(() => {
    if (time !== undefined) {
      setTimeStarted(true);
      actions.start();
      if (timeStarted && timeLeft === 0) {
        setTimeStarted(false);
        console.log("time up");
        handleTimeUp();
      }
    }
    
  }, [timeLeft === 0, timeStarted]);

  return <Typography>{msToHMS(timeLeft)}</Typography>;
};
CountDownTimer.propTypes = {
  time: propTypes.number,
};

export default CountDownTimer;
