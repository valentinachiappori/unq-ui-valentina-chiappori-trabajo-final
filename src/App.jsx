import './App.css'
import { useState } from 'react';
import WordInput from "./components/WordInput";
import { wordExists } from "./api/wordService"

function App() {
  const [chain, setChain] = useState([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitWord = async (word) => {
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
      setScore((prev) => prev + normalizedWord.length);
    } catch (error) {
        setError("No se pudo validar la palabra, intentá de nuevo");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="app">
      <h1>Encadenadas</h1>
      <WordInput onSubmitWord={handleSubmitWord} error={error} loading={loading} />
      <p>Puntaje: {score}</p>
    </div>
  )
}

export default App
