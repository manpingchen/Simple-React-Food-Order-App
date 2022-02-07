import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  { id: 1, name: "Sushi", description: "Authentic Japanese sushi with fresh fishes", price: 22.99 },
  {
    id: 2,
    name: "Burger",
    description: "Guilty cheese burger that you can't resist",
    price: 12.99,
  },
  {
    id: 3,
    name: "Pancake",
    description: "Bacon season fruity pancake",
    price: 7.99,
  },
  {
    id: 4,
    name: "Onion Soup",
    description: "French caramelized onion with cheese floating on top",
    price: 8.99,
  },
];

const AvailableMeals = () => {
  const mealList = DUMMY_MEALS.map((meal) => (
      <MealItem key={meal.id} meal={meal} />
  ));
  return <section className={classes.availableMeals}>{mealList}</section>;
};

export default AvailableMeals;
