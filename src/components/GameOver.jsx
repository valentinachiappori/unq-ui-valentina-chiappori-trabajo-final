import "../styles/GameOver.css";
import Button from './Button';

const GameOver = ({ chainLength, score, onRestart }) => {
  return (
    <div className="game-over-container">
      <div className="game-over-card">
        <h2>¡Se terminó el tiempo!</h2>
        
        <div className="score-section">
          <p className="score-label">Puntaje final</p>
          <span className="score-number">{score}</span>
        </div>
  
        <p className="chain-stats">Encadenaste {chainLength} palabras.</p>

        <Button className="restart-button" onClick={onRestart}>
          Nueva partida
        </Button>
      </div>
    </div>
  );
};

export default GameOver;