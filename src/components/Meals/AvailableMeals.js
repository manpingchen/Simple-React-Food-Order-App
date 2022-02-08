import { useState, useCallback, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchMealsHandler = useCallback(async () => {
    const response = await fetch("https://react-movie-890b6-default-rtdb.firebaseio.com/Meals.json");

    const data = await response.json();

    let mealsArr = [];
    for (const key in data) {
      mealsArr.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(mealsArr);
    console.log({ data, mealsArr });

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes["loading-text"]}>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes["error-section"]}>
        <h4>Oops! Something weng wrong.</h4>
        <p>Error: {httpError}</p>
      </section>
    );
  }

  let mealList = meals.map((meal) => <MealItem key={meal.id} meal={meal} />);

  if (meals.length < 0) {
    mealList = <p>No Meals</p>;
  }

  return <section className={classes.availableMeals}>{mealList}</section>;
};

export default AvailableMeals;
