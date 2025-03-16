import { AiOutlineHeart } from "react-icons/ai"; 
// import { AiFillHeart } from "react-icons/ai"; 
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BiChevronRight } from 'react-icons/bi';
import { BiChevronLeft } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';

interface Dish {
  image: string;
  title: string;
  description: string;
  price: number;
  rating: number;
}

const dishes: Dish[] = [
  {
    image: '/plat1.png',
    title: 'Fattoush salad',
    description: 'Description of the item',
    price: 24.00,
    rating: 4.9,
  },
  {
    image: '/plat1.png',
    title: 'Vegetable salad',
    description: 'Description of the item',
    price: 26.00,
    rating: 4.6,
  },
  {
    image: '/plat1.png',
    title: 'Egg vegi salad',
    description: 'Description of the item',
    price: 23.00,
    rating: 4.5,
  },
  {
    image: '/plat1.png',
    title: 'Vegetable salad',
    description: 'Description of the item',
    price: 26.00,
    rating: 4.6,
  },
];

const SpecialDishes: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <button className="absolute md:block hidden right-4 top-1/2 transform -translate-y-1/2 hover:text-color rounded-full p-2 z-10">
        <BiChevronRight size={24} />
      </button>
    ),
    prevArrow: (
      <button className="absolute md:block hidden left-0 top-1/2 transform -translate-y-1/2  hover:text-color rounded-full p-2 z-10">
        <BiChevronLeft size={24} />
      </button>
    ),
  };

  return (
    <div className="mt-8 relative">
      {/* Section Title */}
      <div className="text-center mb-4">
        <span className="text-red-500 text-sm uppercase font-semibold">Special Dishes</span>
        <h2 className="text-2xl font-bold mt-2 text-dark dark:text-white">Standout Dishes From Our Menu</h2>
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {dishes.map((dish, index) => (
          <div key={index} className="px-4 flex h-fit ">
            <div className="relative rounded-lg w-full  h-fit  shadow-md overflow-hidden bg-white dark:bg-gray-800 text-center">
              {/* Favorite Button */}
              <button className="absolute top-0 right-0 bg-green-500 text-white text-[1.1rem] rounded-bl-lg p-2 z-10">
                {/* <AiFillHeart /> */}
                <AiOutlineHeart />
              </button>

              {/* Image */}
              <img src={dish.image} alt={dish.title} className="w-full  object-cover" />

              {/* Content */}
              <div className="p-4">
                <h3 className="md:text-lg text-[.9rem] font-semibold text-dark dark:text-white">{dish.title}</h3>
                <p className="text-gray-600 text-[.6rem] md:text-sm">{dish.description}</p>
                <div className="md:flex justify-between items-center mt-4">
                  <span className="font-bold text-dark dark:text-white">${dish.price.toFixed(2)}</span>
                  <span className="ml-2 text-yellow-500 flex">
                    {Array.from({ length: Math.floor(dish.rating) }, (_, i) => (
                      <AiFillStar key={i} />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;