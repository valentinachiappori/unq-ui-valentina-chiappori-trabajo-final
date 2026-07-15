import "../styles/Button.css";

const Button = ({ children, onClick, type = "button", disabled = false, className = "", ...rest }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`app-btn ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;