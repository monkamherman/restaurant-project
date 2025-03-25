// src/components/HeroSection.tsx
import React from 'react';
import { FiPlay } from 'react-icons/fi'; // Icône pour le bouton "Watch Video"

interface HeroSectionProps {
  // Ajoute ici les props si nécessaire
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 mt-4">
      {/* Section Texte */}
      <div className="md:w-1/2">
        <h1 className="md:text-4xl text-[1.5rem] md:text-start text-center font-bold mb-6 text-green-700">
          Bienvenue dans un Voyage Gustatif Inoubliable
        </h1>
        <p className="text-dark dark:text-white mb-6 md:text-lg">
          Plongez dans une expérience culinaire unique où chaque bouchée est une célébration de saveurs authentiques et d'ingrédients frais. Chez FOODI, nous transformons les traditions gastronomiques en créations modernes qui ravissent vos sens.
        </p>
        <div className="flex space-x-4">
          <button className="bg-color text-white md:px-6 md:py-3 text-nowrap px-2 text-[.8rem] rounded-full font-semibold hover:bg-green-600 transition duration-300">
            Commandez Maintenant
          </button>
          <button className="flex items-center md:px-6 md:py-3 text-nowrap px-2 text-[.8rem] space-x-2 text-green-600 font-semibold hover:text-green-800">
            Regarder Notre Histoire
            <FiPlay size={20} />
          </button>
        </div>
      </div>

      {/* Section Image */}
      <div className="md:w-1/2 relative mt-8 md:mt-0 flex items-center justify-center">
        <img src="/chef-rmbg.png" alt="Chef" className='absolute z-20 md:-top-14 ' />
        <div className="absolut right-64 md:left-0 top-0 size-80 bg-green-500 rounded-full z-10 "></div>
      </div>
    </div>
  );
};

export default HeroSection;