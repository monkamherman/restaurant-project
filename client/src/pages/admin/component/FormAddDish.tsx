import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
// import { createDish } from "@/service/DishService";

// Schéma de validation avec Zod
const dishSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  price: z.number().positive("Le prix doit être positif"),
  rating: z.number().min(0).max(5, "L'étoile doit être entre 0 et 5").optional(),
  category: z.string().min(3, "La catégorie doit contenir au moins 3 caractères"),
  image: z.string().url("URL invalide").optional(),
  isFavorite: z.boolean().optional(),
});

type DishFormData = z.infer<typeof dishSchema>;

export const FormAddDish = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<DishFormData>({
    resolver: zodResolver(dishSchema),
  });
// const onSubmit = async (data: DishFormData) => {
//   try {
//     const newDish = {
//       id: generateUniqueId(), // Replace this with your ID generation logic
//       ...data,
//     };
//     createDish(newDish);
//     alert("Plat ajouté avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de l'ajout du plat :", error);
//   }
// };

  return (
    <form  className="space-y-4">
      <Input
        {...register("title")}
        placeholder="Titre du plat"
        type="text"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <Textarea
        {...register("description")}
        placeholder="Description du plat"
      />

      <Input
        {...register("price", { valueAsNumber: true })}
        placeholder="Prix"
        type="number"
      />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}

      <Input
        {...register("rating", { valueAsNumber: true })}
        placeholder="Étoiles (0-5)"
        type="number"
      />
      {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}

      <Input
        {...register("category")}
        placeholder="Catégorie"
        type="text"
      />
      {errors.category && <p className="text-red-500">{errors.category.message}</p>}

      <Input
        {...register("image")}
        placeholder="URL de l'image (optionnel)"
        type="text"
      />

      <div className="flex items-center space-x-2">
        <Checkbox {...register("isFavorite")} />
        <label>Favori</label>
      </div>

      <Button type="submit">Ajouter le plat</Button>
    </form>
  );
};


