import "../styles/result.css";

export function Win({ again }) {
  return (
    <div className="container">
      <div className="child">
        <span className="descrip">You Won The Game</span>
        <button onClick={again} className="again">
          Play Again
        </button>
      </div>
    </div>
  );
}

export function Lose({ again }) {
  return (
    <div className="container">
      <div className="child">
        <span className="descrip">You Lost The Game</span>
        <button onClick={again} className="again">
          Try Again
        </button>
      </div>
    </div>
  );
}
