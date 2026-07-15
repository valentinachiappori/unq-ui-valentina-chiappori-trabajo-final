import "../styles/GameOver.css";
import Button from './Button';
import { leaderboardService } from '../api/leaderboardService';
import { useState } from 'react';

const GameOver = ({ chainLength, score, onRestart, onShowLeaderboard }) => {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim() || saved) return;

    leaderboardService.saveScore(name.trim(), score);
    setSaved(true);
  };

  return (
    <div className="game-over-container">
      <div className="game-over-card">
        <h2>¡Se terminó el tiempo!</h2>
        
        <div className="score-section">
          <p className="score-label">Puntaje final</p>
          <span className="score-number">{score}</span>
        </div>
  
        <p className="chain-stats">Encadenaste {chainLength} palabras.</p>

        {saved ? (
          <p className="save-confirmation">¡Puntaje guardado!</p>
        ) : (
          <form className="save-score-form" onSubmit={handleSave}>
            <input
              type="text"
              className="save-score-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              maxLength={20}
            />
            <Button type="submit" className="save-score-button" disabled={!name.trim()}>
              Guardar puntaje
            </Button>
          </form>
        )}
        <div className="game-over-actions">
          <Button className="restart-button" onClick={onRestart}>
            Nueva partida
          </Button>
          <Button className="show-leaderboard-button" onClick={onShowLeaderboard}>
            Ver mejores puntajes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;