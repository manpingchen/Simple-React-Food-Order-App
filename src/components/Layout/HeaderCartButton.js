import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [ifBtnHightlighted, setIfBtnHightlighted] = useState(false);

  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${ifBtnHightlighted ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;
    setIfBtnHightlighted(true);
    const timer = setTimeout(() => setIfBtnHightlighted(false), 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.amount}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
