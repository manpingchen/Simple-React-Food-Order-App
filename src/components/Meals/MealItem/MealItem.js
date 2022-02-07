import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import Card from "../../UI/Card";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const { meal } = props;
  const price = `$${meal.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    console.log(cartCtx)
    cartCtx.addItem({
      ...meal,
      amount: amount,
    });
  };

  return (
    <li>
      <Card>
        <h3>{meal.name}</h3>
        <p className={classes.description}>{meal.description}</p>
        <p className={classes.price}>{price}</p>
        <MealItemForm id={meal.id} onAddToCart={addToCartHandler} />
      </Card>
    </li>
  );
};

export default MealItem;
