export default interface Dish {
  id?: string;
  title: string;
  description?: string;
  price: number;
  rating?: number;
  category: string;
  image?: string;
  isFavorite?: boolean;
}
