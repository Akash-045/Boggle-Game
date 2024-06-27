import { Typography, Paper } from "@mui/material";

/**
 * ScoreBoard component.
 * Displays the current score of the player.
 * @param {Object} props - The component props.
 * @param {number} props.score - The current score to display.
 */
const ScoreBoard = ({ score }) => {
  return (
    <Paper>
      <Typography variant="h5" align="center">
        Score: {score}
      </Typography>
    </Paper>
  );
};

export default ScoreBoard;
