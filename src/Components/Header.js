import "../assets/header.css";

function Header({ currentScore, highestScore }) {
  return (
    <div className="header">
      <div className="title">Pokemon MemoryCard</div>
      <div className="score-board">
        <div>
          <div>Current Score:</div>
          <div>{currentScore}</div>
        </div>
        <div>
          <div>Highest Score:</div>
          <div>{highestScore}</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
