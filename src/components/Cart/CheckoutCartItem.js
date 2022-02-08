import classes from "./CheckoutCartItem.module.css"

const CheckoutCartItem = (props) => {
  const { item } = props;
  return (
    <div className={classes["checkout-cart-item"]}>
      <p className={classes["checkout-cart-item-name"]}>{item.name}</p>
      <div className={classes["checkout-cart-item-detail"]}>
        <p className={classes["checkout-cart-item-price"]}>{item.price}</p>*<p>{item.amount}</p>
      </div>
    </div>
  );
};

export default CheckoutCartItem;
