/**
 * Calculates the score for a list of Boggle words.
 * @param {Array<string>} words - The list of words to calculate the score for.
 * @returns {number} - Total Score
 * @source [Bogg;e Game Rules](https://en.wikipedia.org/wiki/Boggle#rules)
 */
function calculateBoggleScrore(words) {
  let score = 0;
  for (const word of words) {
    //words short than 3 letters
    if (word.length < 3) {
      continue;
      //points based on words length
    } else if (word.length === 3 || word.length === 4) {
      score += 1;
    } else if (word.length === 5) {
      score += 2;
    } else if (word.length === 6) {
      score += 3;
    } else if (word.length === 7) {
      score += 5;
    } else {
      score = +11;
    }
  }
  return score;
}

export default calculateBoggleScrore;
