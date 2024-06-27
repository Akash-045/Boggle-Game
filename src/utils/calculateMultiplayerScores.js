import calculateBoggleScrore from "./calculateBoggleScore";
/**
 * Calculates the scores for multiple players in a multiplayer Boggle game.
 * @param {Array<Array<string>>} playerWord - An array of arrays, where each sub-array contains the words found by a player.
 * @returns {Array<number>} The scores for each player.
 */

function calculateMultiplayerScores(playerWord) {
  const wordCount = {};

  // Count occurrences of each word across all players
  playerWord.forEach((word) => {
    word.forEach((word) => {
      if (wordCount[word]) {
        wordCount[word]++;
      } else {
        wordCount[word] = 1;
      }
    });
  });
  //scores for each player on unique words
  const scores = playerWord.map((words) => {
    const uniquewords = words.filter((word) => wordCount[word] === 1);
    return calculateBoggleScrore(uniquewords);
  });
  return scores;
}

export default calculateMultiplayerScores;
