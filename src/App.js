import React, { useEffect, useState } from "react";
import BoggleBoard from "./components/BoggleBoard";
import ScoreBoard from "./components/ScoreBoard";
import PlayTimer from "./components/PlayTimer";
import validateWord from "./utils/validateWord";

import calculateBoggleScore from "./utils/calculateBoggleScore";
import fixedBoard from "./utils/fixedBoard";
import { Button, Container, TextField } from "@mui/material";
import "./App.css";

/**
 * Main App component for the Boggle game.
 * Manages the game state, including the board, score, timer, and user input.
 */

//checks whether exists in wordsList or not
const wordList = async () => {
  const response = await fetch("/assets/wordlist-english.txt");
  const text = await response.text();
  const wordsArray = text.split("\n").map((word) => word.trim().toUpperCase());
  return new Set(wordsArray);
};

function App() {
  const [board, setBoard] = useState(fixedBoard());
  const [score, setScore] = useState(0);
  const [timeup, setTimeUp] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [words, setWords] = useState([]);
  const [validWords, setValidWords] = useState(new Set());

  useEffect(() => {
    wordList().then(setValidWords);
  }, []);
  /**
   * Handle the event when the timer reaches zero.
   */
  const handleTimeUp = () => {
    setTimeUp(true);
  };

  /**
   * Handle changes to the input field where the user types the word.
   * @param {object} e - The event object from the input field.
   */
  const handleWordChange = (e) => {
    setCurrentWord(e.target.value.toUpperCase());
  };

  /**
   * Validate the entered word, add it to the list of words, and update the score.
   */
  const handleAddWord = () => {
    if (validateWord(board, currentWord) && validWords.has(currentWord)) {
      setWords([...words, currentWord]);
      setScore(score + calculateBoggleScore([currentWord]));
    } else {
      alert("Invalid Word!Please Enter Valid word");
    }
    setCurrentWord("");
  };

  return (
    <Container className="container">
      <img
        src="https://i0.wp.com/technologystuff.co.uk/wp-content/uploads/2012/01/IMG_2569.png?ssl=1"
        alt="Boggle Game"
        style={{ maxWidth: "30%", height: "auto", margin: "20px 0" }}
      />
      <div className="boggle-board" role="grid" aria-label="Boggle Board">
        <BoggleBoard board={board} />
      </div>
      <div className="score-timer">
        <ScoreBoard score={score} aria-label="Scoreboard" />
        <PlayTimer
          initialTime={180}
          onTimeUp={handleTimeUp}
          aria-label="Timer"
        />
      </div>
      <div className="text-field-button">
        <TextField
          label="Enter Word"
          value={currentWord}
          onChange={handleWordChange}
          disabled={timeup}
          className="text-field"
          aria-label="Enter Word"
        />
        <Button
          onClick={handleAddWord}
          disabled={timeup}
          variant="contained"
          className="button"
          aria-label="Add Word"
        >
          Add Word
        </Button>
      </div>
    </Container>
  );
}

export default App;
