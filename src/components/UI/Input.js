import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const { input, label, onChange } = props;
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input {...input} ref={ref} onChange={onChange} />
    </div>
  );
});

export default Input;
