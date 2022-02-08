import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const inputResetHandler = () => {
    setValue("");
    setIsTouched(false);
  };

  return { value, isTouched, inputChangeHandler, inputBlurHandler, inputResetHandler };
};

export default useInput;
