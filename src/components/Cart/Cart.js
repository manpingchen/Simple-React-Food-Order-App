import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Button from "../UI/Button";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { onClose } = props;
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const handleRemoveCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  const handleAddCartItem = (item) => {
    cartCtx.addItem(item); // bug here, we need to send amount to it
  };

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cartItems = (
    <ul>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={handleRemoveCartItem.bind(null, item.id)}
          onAdd={handleAddCartItem.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={onClose}>
      <div className={classes.title}>Ordered Meals</div>
      <div className={classes.detail}>
        {cartItems}
        <div className={classes.price}>
          <span>Total Amount</span>
          <span className={classes["price-amount"]}>{totalAmount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <Button
          className={classes["button--alt"]}
          color="secondary"
          text="Close"
          onClick={onClose}
        />
        {hasItems && <Button className={classes.button} color="primary" text="Order" />}
      </div>
    </Modal>
  );
};

export default Cart;
