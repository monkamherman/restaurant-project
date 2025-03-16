// src/components/Footer.tsx
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="dark:bg-dark border-t-2 border-color shadow-dark py-8">
      <div className="container mx-auto px-4 md:flex md:items-center">
        {/* Logo et Description */}
        <div className="mb-6 md:mb-0 md:w-1/4 space-y-4">
          {/* <img src="/path/to/logo.png" alt="Logo" className="h-8 mb-4" /> */}
      <div className="text-color font-bold text-xl">FOODI</div>

          <p className="dark:text-white text-dark ">
            Savourez l'art culinaire où <br />chaque plat est une œuvre d'art.
          </p>
        </div>

        {/* Liens Utiles */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Liens Utiles</h3>
          <ul>
            <li><a href="#" className="block dark:text-white text-dark hover:text-green-500">À propos</a></li>
            <li><a href="#" className="block dark:text-white text-dark hover:text-green-500">Événements</a></li>
            <li><a href="#" className="block dark:text-white text-dark hover:text-green-500">FAQ</a></li>
          </ul>
        </div>

        {/* Menu Principal */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Menu Principal</h3>
          <ul>
            <li><a href="#" className="block dark:text-white text-dark hover:text-green-500">Accueil</a></li>
            <li><a href="#" className="block dark:text-white text-dark hover:text-green-500">Offres</a></li>
            <li><a href="#" className="block dark:text-white text-dark hover:text-green-500">Menus</a></li>
            <li><a href="#" className="block dark:text-white text-dark hover:text-green-500">Réservation</a></li>
          </ul>
        </div>

        {/* Nous Contacter */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Nous Contacter</h3>
          <p className="dark:text-white text-dark">
            <a href="mailto:example@email.com" className="hover:text-green-500">herman.moukam5@gmail.com</a>
          </p>
          <p className="dark:text-white text-dark">
            <a href="tel:+64958248966" className="hover:text-green-500">+237 658 852 731</a>
          </p>
          <p className="dark:text-white text-dark">Réseaux sociaux</p>
        </div>
      </div>

      {/* Réseaux Sociaux */}
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="text-green-500 hover:text-green-700">
          <FaInstagram size={24} />
        </a>
        <a href="#" className="text-green-500 hover:text-green-700">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="text-green-500 hover:text-green-700">
          <FaYoutube size={24} />
        </a>
        <a href="#" className="text-green-500 hover:text-green-700">
          <FaFacebook size={24} />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center mt-4 dark:text-white text-dark">
        Copyright © 2025 Herman dev | Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;