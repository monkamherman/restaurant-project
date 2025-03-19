import type Dish  from '@/interface/Dish';
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
let dishes: Dish[] = [];

export const createDish = (dish: Dish) => {
  const newDish = { id: generateUUID(), ...dish };
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
