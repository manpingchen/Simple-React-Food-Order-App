import classes from "./Button.module.css";

const Button = (props) => {
  const { className, text, color, onClick, type, disabled = false } = props;
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${classes.button} ${className} bg-${color}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
