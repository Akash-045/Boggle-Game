import { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";

/**
 * PlayTimer component.
 * Displays a countdown timer and triggers an event when the time is up.
 * @param {Object} props - The component props.
 * @param {number} props.initialTime - The initial time for the timer in seconds.
 * @param {Function} props.onTimeUp - The callback function to call when the timer reaches zero.
 */
const PlayTimer = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);

  /**
   * useEffect hook to handle the countdown logic.
   * Decrements the time every second and calls onTimeUp when the timer reaches zero.
   */
  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }
    const timerLogic = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    // Cleanup the interval when the time changes
    return () => clearInterval(timerLogic);
  }, [time, onTimeUp]);

  return (
    <Paper>
      <Typography variant="h5" align="center">
        Time: {time}s
      </Typography>
    </Paper>
  );
};

export default PlayTimer;
