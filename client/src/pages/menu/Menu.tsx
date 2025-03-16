// src/pages/MenuPage.tsx
import React, { useState } from 'react';

interface Dish {
  id: number;
  name: string;
  price: number;
  takeAway: boolean;
  origin: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
  dishes: Dish[];
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Entrées',
    dishes: [
      {
        id: 1,
        name: 'Fattoush Salad',
        price: 12.99,
        takeAway: true,
        origin: 'Liban',
        image: 'https://picsum.photos/800/600?random=1',
      },
      {
        id: 2,
        name: 'Hummus',
        price: 8.99,
        takeAway: false,
        origin: 'Israël',
        image: 'https://picsum.photos/800/600?random=2',
      },
      
    ],
  },
  {
    id: 3,
    name: 'Desserts',
    dishes: [
      {
        id: 5,
        name: 'Tiramisu',
        price: 7.99,
        takeAway: true,
        origin: 'Italie',
        image: 'https://picsum.photos/800/600?random=5',
      },
      {
        id: 6,
        name: 'Millefeuille',
        price: 9.99,
        takeAway: false,
        origin: 'France',
        image: 'https://picsum.photos/800/600?random=6',
      },
    ],
  },
  {
    id: 2,
    name: 'Plats Principaux',
    dishes: [
      {
        id: 3,
        name: 'Pad Thai',
        price: 15.99,
        takeAway: true,
        origin: 'Thaïlande',
        image: 'https://picsum.photos/800/600?random=3',
      },
      {
        id: 4,
        name: 'Beef Bourguignon',
        price: 18.99,
        takeAway: false,
        origin: 'France',
        image: 'https://picsum.photos/800/600?random=4',
      },
    ],
  },
];

const MenuPage: React.FC = () => {
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);

  const handleAddToCart = (dish: Dish) => {
    setSelectedDishes((prevSelectedDishes) => [...prevSelectedDishes, dish]);
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-center mb-8">Notre Menu</h1>

        {/* Liste des Catégories */}
        {categories.map((category) => (
          <div key={category.id} className="mb-12">
            <h2 className="text-2xl font-bold text-green-500 mb-4">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.dishes.map((dish) => (
                <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{dish.name}</h3>
                    <p className="text-gray-600 text-sm mt-2">Origine : {dish.origin}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-green-500">${dish.price.toFixed(2)}</span>
                      {dish.takeAway && (
                        <span className="bg-green-100 text-green-500 text-xs font-semibold px-2 py-1 rounded-full">
                          À emporter
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(dish)}
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 w-full"
                    >
                      Commander
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Panier */}
        {selectedDishes.length > 0 && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Votre Panier</h3>
            <ul>
              {selectedDishes.map((dish) => (
                <li key={dish.id} className="flex justify-between items-center mb-2">
                  <span>{dish.name}</span>
                  <span>${dish.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <span className="font-bold">Total :</span>
              <span className="font-bold text-green-500 ml-2">
                ${selectedDishes.reduce((total, dish) => total + dish.price, 0).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;