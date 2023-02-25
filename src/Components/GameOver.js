function GameOver({ restartGame, show }) {
  return (
    show && (
      <div className="gameover">
        <h1>Game Over</h1>
        <button onClick={restartGame}>Replay</button>
      </div>
    )
  );
}

export default GameOver;
