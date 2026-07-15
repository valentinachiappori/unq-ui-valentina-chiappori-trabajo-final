import "../styles/WordInput.css";
import { useState } from 'react';
import Button from './Button';

const WordInput = ({ onSubmitWord, error, loading, hint }) => {
  const [word, setWord] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!word.trim() || loading) return;

    onSubmitWord(word.trim());
    setWord('');
  };

  const placeholder = hint ? `${hint}...` : 'Ingresá una palabra...';

  return (
    <form className="word-input-form" onSubmit={handleSubmit}>
      <div className="word-input-row">
        <input
          type="text"
          className="word-input-field"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
        />
        <Button type="submit" className="word-input-button" disabled={loading}>
          {loading ? '...' : <i className="bi bi-check-lg" aria-label="Enviar" />}
        </Button>
      </div>
      {error && <p className="word-input-error">{error}</p>}
    </form>
  );
};

export default WordInput;