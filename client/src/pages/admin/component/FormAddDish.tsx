import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Schéma de validation avec Zod
const dishSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  price: z.number().positive("Le prix doit être positif"),
  rating: z.number().min(0).max(5, "L'étoile doit être entre 0 et 5").optional(),
  category: z.string().min(3, "La catégorie doit contenir au moins 3 caractères"),
  image: z.instanceof(FileList).refine((files) => files.length > 0, "Veuillez sélectionner une image").optional(),
  isFavorite: z.boolean().optional(),
});

type DishFormData = z.infer<typeof dishSchema>;

export const FormAddDish = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DishFormData>({
    resolver: zodResolver(dishSchema),
  });

  // Gestion de la prévisualisation de l'image
  const selectedImage = watch("image"); // Obtenir la valeur actuelle de l'image
  const imagePreviewUrl = selectedImage && selectedImage.length > 0 && selectedImage[0] ? URL.createObjectURL(selectedImage[0]) : null;

  const onSubmit = async (data: DishFormData) => {
    try {
      console.log("Données soumises :", data);
      alert("Plat ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du plat :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Titre */}
      <Input
        {...register("title")}
        placeholder="Titre du plat"
        type="text"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      {/* Description */}
      <Textarea
        {...register("description")}
        placeholder="Description du plat"
      />

      {/* Prix */}
      <Input
        {...register("price", { valueAsNumber: true })}
        placeholder="Prix"
        type="number"
      />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}

      {/* Catégorie */}
      <Select {...register("category")}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez une catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Entrées">Entrées</SelectItem>
          <SelectItem value="Plats principaux">Plats principaux</SelectItem>
          <SelectItem value="Desserts">Desserts</SelectItem>
          <SelectItem value="Boissons">Boissons</SelectItem>
        </SelectContent>
      </Select>
      {errors.category && <p className="text-red-500">{errors.category.message}</p>}

      {/* Étoiles (Rating) */}
      <Select {...register("rating", { valueAsNumber: true })}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez une note" />
        </SelectTrigger>
        <SelectContent>
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <SelectItem key={value} value={value.toString()}>
              {value} étoile{value > 1 && "s"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}

      {/* Image */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Sélectionnez une image
        </label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          {...register("image")}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        {imagePreviewUrl && (
          <div className="mt-2">
            <img src={imagePreviewUrl} alt="Aperçu" className="w-32 h-32 object-cover rounded-md" />
          </div>
        )}
      </div>

      {/* Favori */}
      <div className="flex items-center space-x-2">
        <Checkbox {...register("isFavorite")} />
        <label>Favori</label>
      </div>

      {/* Bouton de soumission */}
      <Button type="submit">Ajouter le plat</Button>
    </form>
  );
};