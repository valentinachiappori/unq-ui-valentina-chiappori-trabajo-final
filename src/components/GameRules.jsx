import "../styles/GameRules.css";
import Button from './Button';

const GameRules = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <Button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <i className="bi bi-x-lg" />
        </Button>
        <h2>¿Cómo se juega?</h2>
        <p>
          Ingresá una palabra para empezar. A partir de la segunda, cada palabra debe
          existir en el diccionario, no haber sido usada antes, y empezar con la
          última letra de la palabra anterior.
        </p>
        <p>
          Tenés 15 segundos por turno, que se reinician cada vez que acertas.
          Cada letra vale 1 punto.
        </p>
        <h2>Exitos!</h2>
      </div>
    </div>
  );
};

export default GameRules;