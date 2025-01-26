export default function Header({ score, bestScore }) {
  return (
    <>
      <h1 className="heading">Pokemon Memory Game</h1>
      <p className="description">If you click the card twice you are out</p>
      <div className="scores">
        <span className="currentScore">Score : {score}</span>
        <span className="bestScore">Best : {bestScore}</span>
      </div>
    </>
  );
}
