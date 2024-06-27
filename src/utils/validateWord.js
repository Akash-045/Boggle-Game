/**
 * Manages the game the board.
 * @source [GitHub - AnBera/BoggleGame](https://github.com/AnBera/BoggleGame)
 * @source [TutorialsPoint - Validating a Boggle Word Using JavaScript](https://www.tutorialspoint.com/validating-a-boggle-word-using-javascript)
 */

/**
 * Validates a word against the Boggle board.
 * @param {Array<Array<string>>} board - The current state of the Boggle board.
 * @param {string} word - The word to validate.
 * @returns {boolean} True if the word is valid, false otherwise.
 */

const validateWord = (board, word) => {
  if (word.length < 3) return false;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
//helper function
  const isValidMove = (x, y, path) => {
    return (
      x >= 0 &&
      x < board.length &&
      y >= 0 &&
      y < board[0].length &&
      !path.has(`${x},${y}`)
    );
  };
  /**
   * Depth-first search to find the word on the board.
   * @param {number} x - The current x-coordinate.
   * @param {number} y - The current y-coordinate.
   * @param {string} word - The word to validate.
   * @param {number} index - The current index in the word.
   * @param {Set<string>} path - The current path of the word being formed.
   * @returns {boolean} True if the word is found, false otherwise.
   */
  const dfs = (x, y, word, index, path) => {
    if (index === word.length) return true;
    path.add(`${x},${y}`);
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      if (isValidMove(newX, newY, path) && board[newX][newY] === word[index]) {
        if (dfs(newX, newY, word, index + 1, path)) return true;
      }
    }
    path.delete(`${x},${y}`);
    return false;
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === word[0]) {
        const path = new Set();
        if (dfs(i, j, word, 1, path)) return true;
      }
    }
  }

  return false;
};

export default validateWord;
