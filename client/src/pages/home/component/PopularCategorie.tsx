import React from 'react';

interface Category {
  icon: string;
  title: string;
  count: number;
}

const categories: Category[] = [
  {
    icon: '/path/to/main-dish-icon.png',
    title: 'Plats Principaux',
    count: 86,
  },
  {
    icon: '/path/to/breakfast-icon.png',
    title: 'Petit Déjeuner',
    count: 12,
  },
  {
    icon: '/path/to/dessert-icon.png',
    title: 'Desserts',
    count: 48,
  },
  {
    icon: '/path/to/browse-all-icon.png',
    title: 'Tout Parcourir',
    count: 255,
  },
];

const PopularCategories: React.FC = () => {
  return (
    <div className="mt-8 ">
      <div className="text-center mb-4">
        <span className="text-red-500 text-sm uppercase font-semibold">Favoris des Clients</span>
        <h2 className="text-2xl font-bold mt-2 text-color dark:text-white">Catégories Populaires</h2>
      </div>

      <div className="flex justify-between space-x-4">
        {categories.map((category, index) => (
          <div key={index} className=" rounded-lg shadow-md p-4 w-1/6 text-center">
            <div className="w-16 h-16 mx-auto bg-color rounded-full flex items-center justify-center">
              <img src={category.icon} alt={`${category.title} Icon`} className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold mt-2 text-color dark:text-white">{category.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              ({category.count} {category.title === 'Tout Parcourir' ? 'articles' : category.title.toLowerCase()})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;