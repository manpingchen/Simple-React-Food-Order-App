import { useState, useCallback, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const fetchMealsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://react-movie-890b6-default-rtdb.firebaseio.com/Meals.json"
      );

      const data = await response.json();

      const mealsArr = Object.values(data);
      setMeals(mealsArr);
      console.log({ data, mealsArr });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, []);

  let mealList = meals.map((meal) => <MealItem key={meal.id} meal={meal} />);
  
  if(meals.length < 0) {
    mealList = <p>No Meals</p>
  }
  
  return <section className={classes.availableMeals}>{mealList}</section>;
};

export default AvailableMeals;
