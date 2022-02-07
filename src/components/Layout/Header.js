import { Fragment } from "react";
import mealsImg from "../../assets/image.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>FOOD NOW</h1>
        <HeaderCartButton onClick={props.onCartShown} />
      </header>
      <div className={classes["main-img"]}></div>
    </Fragment>
  );
};

export default Header;
