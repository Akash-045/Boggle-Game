import { Grid, Paper, Typography } from "@mui/material";

/**
 * BoggleBoard component.
 * Displays the Boggle board with the given letters.
 * @param {Object} props - The component props.
 * @param {Array<Array<string>>} props.board - The current state of the Boggle board.
 */
const BoggleBoard = ({ board }) => {
  return (
    <Grid container spacing={2}>
      {board.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <Grid item xs={3} key={`${rowIndex} - ${colIndex}`} role="gridcell">
            <Paper>
              <Typography variant="h4" align="center">
                {letter}
              </Typography>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default BoggleBoard;
