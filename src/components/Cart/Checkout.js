import classes from "./Checkout.module.css";
import Button from "../UI/Button";

const Checkout = (props) => {
  const checkoutHandler = (event) => {
    event.preventDefaut();
  };

  return (
    <form onSubmit={checkoutHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <h4>Where do we deliver?</h4>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div className={classes.control}>
        <label htmlFor="post-code">Postcode</label>
        <input type="text" id="post-code" />
      </div>
      <div className="actions">
        <Button className="button--alt" type="submit" text="Confirm" color="primary" />
        <Button text="Cancel" color="secondary" onClick={props.onCancel} />
      </div>
    </form>
  );
};

export default Checkout;
