import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { item, onRemove, onAdd } = props;

  return (
    <li className={classes["cart-item"]}>
      <div className={classes["cart-item-container"]}>
        <h2>{item.name}</h2>
        <div className={classes.summary}>
          <span>${item.price}</span>
          <span>* {item.amount}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onRemove} className={classes.removeBtn}>-</button>
          <button onClick={onAdd}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
