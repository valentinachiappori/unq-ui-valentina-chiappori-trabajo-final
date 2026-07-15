import Modal from "./Modal";
import "../styles/Leaderboard.css";

const LeaderboardModal = ({ onClose, scores }) => {
  return (
    <Modal onClose={onClose}>
      <h2>TOP 10</h2>
      {scores.length === 0 ? (
        <p className="leaderboard-empty">Todavía no hay puntajes guardados</p>
      ) : (
        <ol className="leaderboard-list">
          {scores.map((entry, index) => (
            <li key={`${entry.name}-${entry.score}-${index}`}>
              <span className="leaderboard-position">{index + 1}</span>
              <span className="leaderboard-name">{entry.name}</span>
              <span className="leaderboard-score">{entry.score}</span>
            </li>
          ))}
        </ol>
      )}
    </Modal>
  );
};

export default LeaderboardModal;