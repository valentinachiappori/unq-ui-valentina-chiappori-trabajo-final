import './App.css'
import { useState, useEffect } from 'react';
import WordInput from "./components/WordInput";
import { wordExists } from "./api/wordService"
import GameOver from "./components/GameOver";

function App() {
  const [chain, setChain] = useState([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [status, setStatus] = useState('playing');

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

  const handleSubmitWord = async (word) => {
    if (status === 'finished') return;
    setError("");

    if (!word) return;

    const normalize = (w) => {
      return w.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

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

  return (
    <div className="app">
      <h1>Encadenadas</h1>
      {status === 'finished' ? (
        <GameOver chainLength={chain.length} score={score} />
      ) : (
        <>
          <p>Tiempo restante: {timeLeft}s</p>
          <WordInput onSubmitWord={handleSubmitWord} error={error} loading={loading} />
          <p>Puntaje: {score}</p>
        </>
      )}
    </div>
  )
}

export default App
