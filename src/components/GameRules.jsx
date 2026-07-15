import "../styles/GameRules.css";
import Modal from "./Modal";

const GameRules = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <h2>¿Cómo se juega?</h2>
      <p>
        Ingresá una palabra para empezar. A partir de la segunda, cada palabra debe
        existir en el diccionario, no haber sido usada antes, y empezar con la
        última letra de la palabra anterior.
      </p>
      <p>
        Tenés 15 segundos por turno, que se reinician cada vez que acertás.
        Cada letra vale 1 punto.
      </p>
      <h2>¡Éxitos!</h2>
    </Modal>
  );
};

export default GameRules;