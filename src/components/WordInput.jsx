import "../styles/WordInput.css";
import { useState } from 'react';

const WordInput = ({ onSubmitWord, error, loading }) => {
  const [word, setWord] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!word.trim() || loading) return;

    onSubmitWord(word.trim());
    setWord('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Ingresá una palabra"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Validando..." : "Enviar"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default WordInput;