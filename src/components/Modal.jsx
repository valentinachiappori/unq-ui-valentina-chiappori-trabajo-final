import Button from './Button';
import "../styles/Modal.css";

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <Button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <i className="bi bi-x-lg" />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;