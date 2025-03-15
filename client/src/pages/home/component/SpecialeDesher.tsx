// src/components/SpecialDishes.tsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Dish {
  image: string;
  title: string;
  description: string;
  price: number;
  rating: number;
}

const dishes: Dish[] = [
  {
    image: '/path/to/fattoush-salad.jpg',
    title: 'Fattoush salad',
    description: 'Description of the item',
    price: 24.00,
    rating: 4.9,
  },
  {
    image: '/path/to/vegetable-salad.jpg',
    title: 'Vegetable salad',
    description: 'Description of the item',
    price: 26.00,
    rating: 4.6,
  },
  {
    image: '/path/to/egg-vegi-salad.jpg',
    title: 'Egg vegi salad',
    description: 'Description of the item',
    price: 23.00,
    rating: 4.5,
  },
  // Ajoute plus de plats si nécessaire
];

const SpecialDishes: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <button className="bg-green-500 text-white rounded-full p-2"><svg>...</svg></button>,
    prevArrow: <button className="bg-gray-200 text-black rounded-full p-2"><svg>...</svg></button>,
  };

  return (
    <div className="mt-8">
      <div className="text-center mb-4">
        <span className="text-red-500 text-sm uppercase font-semibold">Special Dishes</span>
        <h2 className="text-2xl font-bold mt-2">Standout Dishes From Our Menu</h2>
      </div>

      <Slider {...settings}>
        {dishes.map((dish, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 w-64 text-center">
            <img src={dish.image} alt={dish.title} className="w-full h-48 object-cover" />
            <h3 className="text-lg font-semibold mt-2">{dish.title}</h3>
            <p className="text-gray-600 text-sm">{dish.description}</p>
            <div className="flex justify-between items-center mt-4">
              <div>
                <span className="font-bold">${dish.price.toFixed(2)}</span>
                <span className="ml-2 text-yellow-500">
                  {Array.from({ length: dish.rating }, (_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.11 1.118l-1.591 5.476c-.392.136-.92.035-1.118-.287l-.008-.08Zm0 0L18.999 19.5a1.25 1.25 0 01-1.118-.287l-.008-.08A1 1 0 0016 18.364l-1.05-3.673a1 1 0 00-.364-1.118L10.94 9.57a1 1 0 00-.364-1.118L6.976 3.223A1 1 0 005.03 3.292l-3.951 2.8 a1 1 0 00-.951.69zm9.5 1.757l-3 10.126A1 1 0 0012 21h8a1 1 0 000-2zM12 20H4v-7h8v7z"/>
                    </svg>
                  ))}
                </span>
              </div>
              <div>
                <span className="font-bold">${dish.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;