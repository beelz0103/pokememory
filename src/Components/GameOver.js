function GameOver({ restartGame, show, score }) {
  return (
    show && (
      <div className="gameover">
        <div>Game Over</div>
        <div className="gameover-score">Score: {score}</div>
        <button onClick={restartGame}>Play Again</button>
      </div>
    )
  );
}

export default GameOver;
