import type Dish from "@/interface/Dish";
import { Link } from "react-router-dom";

export const DishCard = ({ dish }: { dish: Dish }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-bold">{dish.title}</h3>
      <p>{dish.description}</p>
      <p>Prix : {dish.price} €</p>
      <p>Étoiles : {dish.rating || "Non noté"}</p>
      <Link to={`/edit/${dish.id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Modifier
        </button>
      </Link>
    </div>
  );
};