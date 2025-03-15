import { BiChevronDown } from "react-icons/bi"; 
// src/components/Header.tsx
import React from 'react';
import { FiSearch} from 'react-icons/fi'; // Icônes pour la recherche et le panier
import { FaPhoneAlt } from 'react-icons/fa'; // Icône pour le contact
import { ModeToggle } from '@/components/ui/mode_toggle';

interface HeaderProps {
  // Ajoute ici les props si nécessaire
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-dark dark:shadow-dark-mode shadow-light md:px-8 p-4">
      {/* Logo */}
      <div className="text-color font-bold text-xl">FOODI</div>

      {/* Menu */}
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="text-dark dark:text-color hover:text-green-800 font-semibold">
          Home
        </a>
        <div className="relative group">
          <button className="text-color hover:text-green-800 flex items-center space-x-1">
            <span className="text-dark dark:text-color hover:text-color font-semibold">Menu</span>
           <BiChevronDown />
          </button>
          {/* Dropdown Menu */}
          <ul className="absolute hidden group-hover:block bg-white shadow rounded p-2 mt-2">
            <li><a href="#" className="block px-2 py-1 hover:bg-gray-100">Menu Item 1</a></li>
            <li><a href="#" className="block px-2 py-1 hover:bg-gray-100">Menu Item 2</a></li>
          </ul>
        </div>
        <div className="relative group">
          <button className="text-color hover:text-green-800 flex items-center">
          <span className="text-dark dark:text-color hover:text-color font-semibold">Services</span>
          <BiChevronDown />
          </button>
          {/* Dropdown Menu */}
          <ul className="absolute hidden group-hover:block bg-white shadow rounded p-2 mt-2">
            <li><a href="#" className="block px-2 py-1 hover:bg-gray-100">Service 1</a></li>
            <li><a href="#" className="block px-2 py-1 hover:bg-gray-100">Service 2</a></li>
          </ul>
        </div>
        <a href="#" className="text-dark dark:text-color hover:text-color font-semibold">
          Offers
        </a>
      </nav>

      {/* Search, Cart, and Contact */}
      <div className="flex items-center space-x-4">
        <FiSearch className="text-dark dark:text-color hover:text-color font-semibold cursor-pointer" size={20} />
        {/* <div className="relative">
          <FiShoppingCart className="text-color cursor-pointer" size={20} />
          <span className="absolute -top-1 -right-1 bg-color text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </div> */}
        <ModeToggle />
        <button className="bg-color text-white px-4 py-2 rounded-full flex items-center space-x-2">
          <FaPhoneAlt size={20} />
          <span>Contact</span>
        </button>
      </div>
    </header>
  );
};

export default Header;