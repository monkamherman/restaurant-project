import type Dish  from '@/interface/Dish';
import { randomUUID } from 'crypto';

let dishes: Dish[] = [];

export const createDish = (dish: Dish) => {
  const newDish = { id: randomUUID(), ...dish };
  dishes.push(newDish);
};

export const getDishesByCategory = (category: string) => {
  return dishes.filter((dish) => dish.category === category);
};

export const getDishById = (id: string) => {
  return dishes.find((dish) => dish.id === id);
};

export const updateDish = (dishId: string, updatedData: Partial<Dish>) => {
  dishes = dishes.map((dish) =>
    dish.id === dishId ? { ...dish, ...updatedData } : dish
  );
};
