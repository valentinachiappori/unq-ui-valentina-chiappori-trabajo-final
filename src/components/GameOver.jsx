const GameOver = ({ chainLength, score }) => {
  return (
    <div className="game-over">
      <h2>Se terminó el tiempo</h2>
      <p>Encadenaste {chainLength} palabras.</p>
      <p>Puntaje final: {score}</p>
    </div>
  );
};

export default GameOver;