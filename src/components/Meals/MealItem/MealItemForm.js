import { useRef, useState } from "react";
import Button from "../../UI/Button";
import ErrorText from "../../UI/ErrorText";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [ifAmountValid, setIfAmountValid] = useState(true);
  const amountInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onAddToCart(+amountInputRef.current.value);
  };

  const amountValidHandler = () => {
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setIfAmountValid(false);
    } else {
      setIfAmountValid(true);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
        onChange={amountValidHandler}
      />
      <Button className={classes.button} color="primary" text="+ Add" type="submit" />
      {!ifAmountValid && <ErrorText text="Please enter a valid amount (1-5)" />}
    </form>
  );
};

export default MealItemForm;
