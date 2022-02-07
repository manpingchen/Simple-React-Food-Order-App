import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCart = () => {
    setIsCartShown(true);
  };

  const hideCart = () => {
    setIsCartShown(false);
  };

  return (
    <CartProvider>
      <Header onCartShown={showCart} />
      <main>
        <Meals />
      </main>
      {isCartShown && <Cart onClose={hideCart} />}
    </CartProvider>
  );
}

export default App;
