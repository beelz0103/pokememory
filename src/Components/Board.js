import React, { useState } from "react";
import Header from "./Header";
import CardContainer from "./CardContainer";
import GameOver from "./GameOver";
import Loader from "./Loader";

function Board() {
  const [scoreData, setScoreData] = useState({
    currentScore: 0,
    highestScore: 0,
  });
  const [isGameOver, setIsGameOver] = useState(false);

  const [currentLevel, setCurrentLevel] = useState({
    lvlNumber: 1,
    cardQty: 4,
  });
  const [isLoading, setIsLoading] = useState(true);

  const incrementLevel = () => {
    const nextLevel = {
      lvlNumber: currentLevel.lvlNumber + 1,
      cardQty:
        currentLevel.cardQty === 14
          ? currentLevel.cardQty
          : currentLevel.cardQty + 2,
    };
    setIsLoading(true);
    setCurrentLevel(nextLevel);
  };

  const incrementScore = () => {
    if (scoreData.currentScore === scoreData.highestScore) {
      setScoreData({
        currentScore: scoreData.currentScore + 1,
        highestScore: scoreData.highestScore + 1,
      });
    } else {
      setScoreData({
        ...scoreData,
        currentScore: scoreData.currentScore + 1,
      });
    }
  };

  const restartGame = () => {
    setScoreData({
      ...scoreData,
      currentScore: 0,
    });
    setCurrentLevel({ lvlNumber: 1, cardQty: 4 });
    setIsGameOver(false);
    showLoader(true);
  };

  const onGameOver = () => {
    setIsGameOver(true);
  };

  const showLoader = (value) => {
    setIsLoading(value);
  };

  return (
    <div className="board">
      <Loader show={isLoading} />
      <GameOver restartGame={restartGame} show={isGameOver} />
      <Header
        currentScore={scoreData.currentScore}
        highestScore={scoreData.highestScore}
      />
      <CardContainer
        levelData={currentLevel}
        incrementLevel={incrementLevel}
        incrementScore={incrementScore}
        onGameOver={onGameOver}
        showLoader={showLoader}
      />
    </div>
  );
}

export default Board;
