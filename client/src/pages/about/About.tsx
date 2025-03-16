// src/pages/AboutUsPage.tsx
import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { BlurFade } from '@/components/magicui/blur-fade';

// Tableau d'images générées dynamiquement
const images = Array.from({ length: 9 }, (_, i) => {
  const isLandscape = i % 2 === 0;
  const width = isLandscape ? 800 : 600;
  const height = isLandscape ? 600 : 800;
  return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
});


const AboutUsPage: React.FC = () => {
  return (
    <div className=" py-8">
      {/* Philosophie du Restaurant */}
      <section className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-color">Philosophie du Restaurant</h2>
       <div className="flex md:flex items-center justify-center">
        <img src="/chef-rmbg.png" alt="restaurant" className='flex-1' />
       <p className="text-dark dark:text-white  flex-1">
          Chez FOODI, nous croyons que chaque plat est une œuvre d'art culinaire. Nous mettons un point d'honneur à utiliser des ingrédients frais et locaux pour offrir à nos clients une expérience gastronomique inoubliable.
        </p>
       </div>
      </section>

      {/* Contact */}
      <section className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-color">Contactez-nous</h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/3 text-center md:text-left">
            <FaEnvelope className="text-green-500 text-2xl mb-2" />
            <p className="text-dark dark:text-white">example@email.com</p>
          </div>
          <div className="md:w-1/3 text-center md:text-left">
            <FaPhone className="text-green-500 text-2xl mb-2" />
            <p className="text-dark dark:text-white">+64 958 248 966</p>
          </div>
          <div className="md:w-1/3 text-center md:text-left">
            <FaMapMarkerAlt className="text-green-500 text-2xl mb-2" />
            <p className="text-dark dark:text-white">Adresse du restaurant</p>
          </div>
        </div>
      </section>

      {/* Localisation */}
      <section className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-color">Localisation</h2>
        <div className=" flex flex-1  items-center justify-center ">
              <iframe
                id="map-canvas"
                className="left-0 top-0 h-[20rem] w-full border border-gray-300 shadow-lg  lg:size-full"
                frameBorder="0"
                scrolling="yes"
                src="https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=Cameroon%20Marché%20Melen&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="Marché Melen Map"
              ></iframe>
          </div>
      </section>

      {/* Mini Galerie */}
      <section className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-color">Mini Galerie</h2>
        <div className="columns-2 gap-4 sm:columns-3">
          {images.map((imageUrl, idx) => (
            <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
              <img
                className="mb-4 size-full rounded-lg object-cover shadow-md"
                src={imageUrl}
                alt={`Image ${idx + 1}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Informations Pratiques */}
      <section className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-color">Informations Pratiques</h2>
        <ul className="list-disc list-inside text-dark dark:text-white">
          <li>Horaires d'ouverture : <span className='text-[1.1rem] font-semibold text-color'>Lundi - Dimanche, 10h - 22h</span></li>
          <li>Capacité maximale : <span className='text-[1.1rem] font-semibold text-color'>100 personnes</span></li>
          <li>Acceptation des cartes de crédit :<span className='text-[1.1rem] font-semibold text-color'> Visa, Mastercard, Orange Money, MTN Mobile Money</span></li>
        </ul>
      </section>

      {/* Histoire */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4 text-color">Notre Histoire</h2>
        <div className="flex md:flex items-center justify-center">
       <p className="text-dark dark:text-white  flex-1">
       Fondé en 2010, FOODI a rapidement gagné une réputation pour sa qualité exceptionnelle et son service chaleureux. Depuis lors, nous avons continué à innover et à améliorer notre offre pour satisfaire nos clients fidèles.

        </p>
        <img src="/chef-rmbg.png" alt="restaurant" className='flex-1' />
       </div>
      </section>
    </div>
  );
};

export default AboutUsPage;