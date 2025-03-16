// src/components/OurStoryAndServices.tsx
import React from 'react';

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: (
     <img src="/salad.svg" alt="salad" />
    ),
    title: 'TRAITEUR',
    description: 'Épatez vos invités avec nos saveurs et notre présentation.',
  },
  {
    icon: (
      <img src="/time-fast.svg" alt="livraison rapide" />
    ),
    title: 'LIVRAISON RAPIDE',
    description: 'Nous livrons votre commande rapidement à votre porte.',
  },
  {
    icon: <img src="/shopping-cart.svg" alt="commande en ligne" />,
    title: 'COMMANDE EN LIGNE',
    description: 'Explorez notre menu et commandez facilement en ligne.',
  },
  {
    icon: <img src="/gift.svg" alt="cadeaux" />,
    title: 'CARTES CADEAUX',
    description: "Offrez l'expérience culinaire exceptionnelle de Foodi avec nos cartes cadeaux.",
  },
];

const OurStoryAndServices: React.FC = () => {
  return (
    <div className="mt-8 md:flex gap-4 justify-center items-center">
      {/* Section Titre */}
      <div className="text-center mb-4">
        <span className="text-red-500 text-sm uppercase font-semibold">Notre Histoire & Services</span>
        <h2 className="text-2xl font-bold mt-2 text-dark dark:text-white">Notre Parcours Culinaire et Nos Services</h2>
        <p className=" mt-2 text-dark dark:text-white">
          Enracinés dans la passion, nous créons des expériences gastronomiques inoubliables et proposons des services exceptionnels, alliant art culinaire et hospitalité chaleureuse.
        </p>
        <button className="bg-green-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-green-600 transition duration-300">
          Découvrir
        </button>
      </div>

      {/* Services */}
      <div className="flex justify-between w-full items-center  flex-col gap-4 space-4 mt-8 flex-wrap">
        {services.map((service, index) => (
          <div key={index} className="bg-white dark:shadow-dark-mode shadow-light rounded-lg p-4 md:w-64  text-center">
            {service.icon}
            <h3 className="text-lg text-color font-semibold mt-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurStoryAndServices;