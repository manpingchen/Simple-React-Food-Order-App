import { useState, useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Button from "../UI/Button";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CheckoutCartItem from "./CheckoutCartItem";

const Cart = (props) => {
  const { onClose } = props;
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);

  const handleRemoveCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  const handleAddCartItem = (item) => {
    cartCtx.addItem(item); // bug here, we need to send amount to it
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cartItems = isCheckout ? (
    cartCtx.items.map((item) => <CheckoutCartItem item={item} key={item.id} />)
  ) : (
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

  const modalActions = (
    <div className="actions">
      <Button className="button--alt" color="secondary" text="Close" onClick={onClose} />
      {hasItems && (
        <Button className={classes.button} color="primary" text="Order" onClick={orderHandler} />
      )}
    </div>
  );

  const priceClasses = isCheckout
    ? `${classes.price} ${classes["price-hightlight"]}`
    : `${classes.price}`;

  return (
    <Modal onClose={onClose}>
      <div className={classes.title}>Your Cart</div>
      <div className={classes.detail}>
        {cartItems}
        <div className={priceClasses}>
          <span>Total Amount</span>
          <span className={classes["price-amount"]}>{totalAmount}</span>
        </div>
      </div>
      {!isCheckout && modalActions}
      {isCheckout && <Checkout onCancel={onClose} />}
    </Modal>
  );
};

export default Cart;
