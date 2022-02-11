import classes from "./Checkout.module.css";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";
import { useEffect, useState } from "react";

const isNotEmpty = (value) => value.trim() !== "";

const Checkout = (props) => {
  const { confirmHandler, onCancel } = props;
  const [isFormValid, setIsFormValid] = useState(false);

  const {
    value: nameValue,
    isTouched: isNameInputTouched,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    inputResetHandler: nameInputResetHandler,
  } = useInput();

  const {
    value: streetValue,
    isTouched: isStreetInputTouched,
    inputChangeHandler: streetInputChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    inputResetHandler: streetInputResetHandler,
  } = useInput();

  const {
    value: postcodeValue,
    isTouched: isPostcodeInputTouched,
    inputChangeHandler: postcodeInputChangeHandler,
    inputBlurHandler: postcodeInputBlurHandler,
    inputResetHandler: postcodeInputResetHandler,
  } = useInput();

  const checkoutHandler = (event) => {
    event.preventDefault();

    if (isFormValid) {
      console.log("Order Confirmed!", { nameValue, streetValue, postcodeValue });
      nameInputResetHandler();
      streetInputResetHandler();
      postcodeInputResetHandler();
      setIsFormValid(false);
    }

    confirmHandler({ name: nameValue, street: streetValue, postcode: postcodeValue });
  };

  useEffect(() => {
    console.log({ nameValue, streetValue, postcodeValue });
    if (isNotEmpty(nameValue) && isNotEmpty(streetValue) && isNotEmpty(postcodeValue)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [nameValue, streetValue, postcodeValue]);

  const isInitialRender = !isNameInputTouched && !isStreetInputTouched && !isPostcodeInputTouched;

  const inputClasses = (value) =>
    `${
      !isNotEmpty(value) && !isInitialRender && !isFormValid ? classes["input-value-invalid"] : ""
    }`;

  const inputInvalidText = (columnName) => (
    <p className={classes["error-text"]}>Please enter a valid {columnName}.</p>
  );

  return (
    <form onSubmit={checkoutHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <div>
          <input
            type="text"
            id="name"
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
            value={nameValue}
            className={inputClasses(nameValue)}
          />
          {!nameValue && !isInitialRender && inputInvalidText("name")}
        </div>
      </div>
      <h4>Where do we deliver?</h4>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <div>
          <input
            type="text"
            id="street"
            onChange={streetInputChangeHandler}
            onBlur={streetInputBlurHandler}
            value={streetValue}
            className={inputClasses(streetValue)}
          />
          {!streetValue && !isInitialRender && inputInvalidText("street")}
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="post-code">Postcode</label>
        <div>
          <input
            type="text"
            id="post-code"
            onChange={postcodeInputChangeHandler}
            onBlur={postcodeInputBlurHandler}
            value={postcodeValue}
            className={inputClasses(postcodeValue)}
          />
          {!postcodeValue && !isInitialRender && inputInvalidText("postcode")}
        </div>
      </div>
      <div className="actions">
        <Button
          disabled={!isFormValid}
          className="button--alt"
          type="submit"
          text="Confirm"
          color={!isFormValid ? "secondary" : "primary"}
        />
        <Button text="Cancel" color="secondary" onClick={onCancel} />
      </div>
    </form>
  );
};

export default Checkout;
