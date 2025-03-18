import { DishCard } from "./DishCard";
import { getDishesByCategory } from "@/service/DishService";

export const DishList = ({ category }: { category: string }) => {
  const dishes = getDishesByCategory(category);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{category}</h2>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
};