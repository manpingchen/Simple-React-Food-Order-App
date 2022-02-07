import classes from "./ErrorText.module.css";

const ErrorText = (props) => {
  return <p className={`${classes.error} ${classes.caption}`}>{props.text}</p>;
};

export default ErrorText;
