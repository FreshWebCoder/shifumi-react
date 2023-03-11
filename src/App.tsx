import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  FaRegHandPaper,
  FaRegHandRock,
  FaRegHandScissors,
} from "react-icons/fa";

import styles from "./App.module.css";
import "./App.css";

function App() {
  const [playerHand, setPlayerHand] = useState(0);
  const [computerHand, setComputerHand] = useState(0);
  const [timer, setTimer] = useState(3);
  const [runTimer, setRunTimer] = useState(false);
  const [results, setResults] = useState<{
    winner: string;
    message: string;
  }>({
    winner: "",
    message: "",
  });
  const [score, setScore] = useState<{
    player: number;
    computer: number;
  }>({
    player: 0,
    computer: 0,
  });

  useEffect(() => {
    if (runTimer && timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1_000);
    } else if (runTimer && timer < 1) {
      setRunTimer(false);
      setTimer(3);
      match();
    }
  }, [runTimer, timer]);

  const options: {
    name: "rock" | "paper" | "scissors";
    icon: ReactNode;
  }[] = [
    { name: "rock", icon: <FaRegHandRock size={60} /> },
    { name: "paper", icon: <FaRegHandPaper size={60} /> },
    { name: "scissors", icon: <FaRegHandScissors size={60} /> },
  ];

  const match = useCallback(() => {
    if (
      (options[playerHand].name === "rock" &&
        options[computerHand].name === "rock") ||
      (options[playerHand].name === "paper" &&
        options[computerHand].name === "paper") ||
      (options[playerHand].name === "scissors" &&
        options[computerHand].name === "scissors")
    ) {
      setResults({ winner: "No one", message: "We hav a draw" });
    } else if (
      (options[playerHand].name === "rock" &&
        options[computerHand].name === "scissors") ||
      (options[playerHand].name === "scissors" &&
        options[computerHand].name === "paper") ||
      (options[playerHand].name === "paper" &&
        options[computerHand].name === "rock")
    ) {
      setResults({
        winner: "Player",
        message: `${options[playerHand].name.toUpperCase()} beats ${options[
          computerHand
        ].name.toUpperCase()} `,
      });
      setScore((prevScore) => ({ ...prevScore, player: prevScore.player + 1 }));
    } else {
      setResults({
        winner: "Computer",
        message: `${options[computerHand].name.toUpperCase()} beats ${options[
          playerHand
        ].name.toUpperCase()} `,
      });
      setScore((prevScore) => ({
        ...prevScore,
        computer: prevScore.computer + 1,
      }));
    }
  }, [playerHand, computerHand]);

  const selectOption = useCallback((handIndex: number) => {
    setResults({ winner: "", message: "" });

    setPlayerHand(handIndex);
  }, []);

  const generateComputerHand = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    setComputerHand(randomNumber);
  };

  const start = useCallback(() => {
    setResults({ winner: "", message: "" });
    setRunTimer(true);
    generateComputerHand();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleCtn}>
          <h1>ROCK, PAPER, SCISSORS</h1>
        </div>
      </div>
      <div className={styles.scoreCtn}>
        <div className={styles.score}>
          <h3>Player</h3>
          <p>Score: {score.player}</p>
        </div>
        <div className={styles.score}>
          <h3>Computer</h3>
          <p>Score: {score.computer}</p>
        </div>
      </div>
      <div className={styles.results}>
        <div className={styles.playerHand}>
          {runTimer && (
            <div className={styles.playerShake}>{options[0].icon}</div>
          )}
          {results.winner && (
            <>
              {options[playerHand].icon}
              <p>{options[playerHand].name}</p>
            </>
          )}
        </div>

        <div className={styles.midCol}>
          {runTimer && <p className={styles.timer}>{timer}</p>}
          {results?.winner && (
            <>
              <p className={styles.resultsWinner}>Winner:: {results.winner}</p>
              <p className={styles.resultsMessage}>{results.message}</p>
            </>
          )}
        </div>

        <div className={styles.computerHand}>
          {runTimer && (
            <div className={styles.computerShake}>{options[0].icon}</div>
          )}
          {results.winner && (
            <>
              {options[computerHand].icon}
              <p>{options[computerHand].name}</p>
            </>
          )}
        </div>
      </div>
      <div className={styles.choiceBtnCtn}>
        <button
          className={`${styles.choiceBtn} ${styles.bounce} ${
            playerHand === 0 ? styles.activeChoice : ""
          }`}
          onClick={() => selectOption(0)}
        >
          <FaRegHandRock size={60} />
          Rock
        </button>
        <button
          className={`${styles.choiceBtn} ${styles.bounce} ${
            playerHand === 1 ? styles.activeChoice : ""
          }`}
          onClick={() => selectOption(1)}
        >
          <FaRegHandPaper size={60} />
          Hand
        </button>
        <button
          className={`${styles.choiceBtn} ${styles.bounce} ${
            playerHand === 2 ? styles.activeChoice : ""
          }`}
          onClick={() => selectOption(2)}
        >
          <FaRegHandScissors size={60} />
          Scissors
        </button>
      </div>
      <button className={styles.playBtn} onClick={start}>
        Play
      </button>
    </>
  );
}

export default App;
