import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { updateDish } from "@/service/DishService";
import { getDishById } from '../../service/DishService';

const dishSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  price: z.number().positive(),
  rating: z.number().min(0).max(5).optional(),
  category: z.string().min(3),
  image: z.string().url().optional(),
  isFavorite: z.boolean().optional(),
});

type DishFormData = z.infer<typeof dishSchema>;

const defaultValues: DishFormData = {
  title: '',
  price: 0,
  category: '',
  description: '',
  rating: undefined,
  image: undefined,
  isFavorite: false,
};

export const EditDish = () => {
  const { id } = useParams<{ id: string }>();
  const dish = typeof id !== 'undefined' ? getDishById(id) : null; // Handle undefined case

  const {
    handleSubmit,
  } = useForm<DishFormData>({
    resolver: zodResolver(dishSchema),
    defaultValues: dish ?? defaultValues, // Use default values if dish is null
  });

  
  const onSubmit = async (data: DishFormData) => {
    try {
      if (id !== undefined) {
        updateDish(id, data);
      } else {
        console.error("ID is undefined");
      }
      alert("Plat mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Champs similaires à FormAddDish */}
      <Button type="submit">Mettre à jour</Button>
    </form>
  );
};