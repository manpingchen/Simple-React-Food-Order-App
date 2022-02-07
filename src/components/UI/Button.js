import classes from "./Button.module.css";

const Button = (props) => {
  const { className, text, color, onClick, type } = props;
  return (
    <button type={type} className={`${classes.button} ${className} bg-${color}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
