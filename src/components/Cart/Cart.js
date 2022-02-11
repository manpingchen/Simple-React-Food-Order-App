import React, { useState, useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Button from "../UI/Button";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CheckoutCartItem from "./CheckoutCartItem";

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const deliveryEarliestTime = getRandomIntInclusive(10, 20);
const deliveryLatiestTime = getRandomIntInclusive(25, 50);
const today = new Date();
const today2 = new Date();
const currentMin = today.getMinutes();
today.setMinutes(currentMin + deliveryEarliestTime);
today2.setMinutes(currentMin + deliveryLatiestTime);

const twoDigitsHandler = (mins) => (mins < 10 ? `0${mins}` : mins);
const deliveredEstTime = `${today.getHours() + ":" + twoDigitsHandler(today.getMinutes())} - ${
  today2.getHours() + ":" + twoDigitsHandler(today2.getMinutes())
}`;

const Cart = (props) => {
  const { onClose } = props;
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const handleRemoveCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  const handleAddCartItem = (item) => {
    cartCtx.addItem(item); // bug here, we need to send amount to it
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitCheckoutHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-movie-890b6-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, order: cartCtx.items }),
      }
    );
    if (response) {
      setIsSubmitting(false);
      if (response.ok) {
        setIsOrdered(true);
        cartCtx.clearItem();
      } else {
        setIsOrdered(false);
      }
    }
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

  const cartModalContent = (
    <React.Fragment>
      {!isOrdered && (
        <div>
          <div className={classes.title}>Your Cart</div>
          <div className={classes.detail}>
            {cartItems}
            <div className={priceClasses}>
              <span>Total Amount</span>
              <span className={classes["price-amount"]}>{totalAmount}</span>
            </div>
          </div>
          {!isCheckout && modalActions}
          {isCheckout && <Checkout onCancel={onClose} confirmHandler={submitCheckoutHandler} />}
        </div>
      )}
      {isOrdered && (
        <div className={classes["order-text"]}>
          <h4>Yeeeesssss!</h4>
          <p>We got your order!</p>
          <p>The restaurant is now processing your meal.</p>
          <p className={classes["delivered-time"]}>
            Delivered time:
            <br />
            {deliveryEarliestTime} mins - {deliveryLatiestTime} mins ({deliveredEstTime})
          </p>
        </div>
      )}
    </React.Fragment>
  );

  return <Modal onClose={onClose}>{!isSubmitting ? cartModalContent : <p>Submitting...</p>}</Modal>;
};

export default Cart;
