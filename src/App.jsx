import './App.css'
import { useState, useEffect } from 'react';
import WordInput from "./components/WordInput";
import { wordExists } from "./api/wordService"
import GameOver from "./components/GameOver";
import Chain from "./components/Chain";
import GameRules from './components/GameRules';
import Button from './components/Button';
import Leaderboard from './components/Leaderboard';
import { leaderboardService } from './api/leaderboardService';

const normalize = (w) => {
      return w.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function App() {
  const [chain, setChain] = useState([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [status, setStatus] = useState('playing');
  const [activeModal, setActiveModal] = useState(null);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (status !== 'playing' || loading || chain.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        setStatus('finished');
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, status, chain]);

  const nextLetterHint = chain.length > 0 ? normalize(chain[chain.length - 1]).slice(-1).toUpperCase() : null;
  
  const handleSubmitWord = async (word) => {
    if (status === 'finished') return;
    setError("");

    if (!word) return;

    const normalizedWord = normalize(word);

    if (chain.length > 0) {
      const lastWord = normalize(chain[chain.length - 1]);
      const lastLetter = lastWord.slice(-1);

      if (!normalizedWord.startsWith(lastLetter)) {
        setError(`La palabra debe empezar con la letra "${lastLetter.toUpperCase()}".`);
        return;
      }
    }

    const isUsed = chain.some((w) => normalize(w) === normalizedWord);
    if (isUsed) {
      setError("La palabra ya fue utilizada.");
      return;
    }

    try {
      setLoading(true);
      const exists = await wordExists(normalizedWord);
      if (!exists) {
        setError("La palabra no existe en el diccionario.");
        return;
      }
      setChain((prev) => [...prev, word]);
      setScore((prev) => prev + word.length);
      setTimeLeft(15);
    } catch {
        setError("No se pudo validar la palabra, intentá de nuevo");
    } finally {
      setLoading(false); 
    }
  };
  
  const handleRestart = () => {
    setChain([]);
    setScore(0);
    setError('');
    setTimeLeft(15);
    setStatus('playing');
  };

  const closeModal = () => setActiveModal(null);

  const openLeaderboard = () => {
    setScores(leaderboardService.getScores());
    setActiveModal('leaderboard');
  };

  return (
    <div className="app">
      {status === 'finished' ? (
        <>
          <GameOver 
            chainLength={chain.length} 
            score={score} 
            onRestart={handleRestart} 
            onShowLeaderboard={openLeaderboard}
          />
        </>
      ) : chain.length === 0 ? (
        <div className="start-card">
          <h1 className="app-title">encadenadas</h1>
          <WordInput
            onSubmitWord={handleSubmitWord}
            error={error}
            loading={loading}
            hint={nextLetterHint}
          />
          <Button className="start-instructions" onClick={() => setActiveModal('rules')}  disabled={loading}>
            ¿Cómo se juega?
          </Button>
          <Button className="show-leaderboard-button" onClick={openLeaderboard} disabled={loading}>
            Ver mejores puntajes
          </Button>
        </div>
      ) : (
        <div className="playing-card">
          <div className="app-header">
            <h1 className="app-title app-title-playing">encadenadas</h1>
            <span className="timer">{timeLeft}s</span>
          </div>
          <Chain chain={chain} />
          <WordInput
            onSubmitWord={handleSubmitWord}
            error={error}
            loading={loading}
            hint={nextLetterHint}
          />
          <p className="score">
            Puntaje: <strong>{score}</strong>
          </p>
        </div>
      )}
      {activeModal === 'rules' && <GameRules onClose={closeModal} />}
      {activeModal === 'leaderboard' && (
        <Leaderboard onClose={closeModal} scores={scores} />
      )}
    </div>
  );
}

export default App
