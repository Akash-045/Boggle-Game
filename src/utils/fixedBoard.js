/**
 * Generates a 4*4 Boggle Board with random letters
 * @returns {Array<Array<string>>} - 2D Array represents the BoggleBoard
 */

function fixedBoard() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const boardSize = 4;
  const board = [];//rows of board

  //Generate Boggle Board
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let k = 0; k < boardSize; k++) {
      //select random letter from alphabet
      const Index = Math.floor(Math.random() * letters.length);
      row.push(letters[Index]);
    }
    board.push(row);
  }
  return board;
}
export default fixedBoard;
