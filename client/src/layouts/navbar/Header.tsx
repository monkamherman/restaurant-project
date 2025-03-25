import React from 'react';
import { FiSearch } from 'react-icons/fi'; // Icônes pour la recherche et le panier
import { FaPhoneAlt } from 'react-icons/fa'; // Icône pour le contact
import { BiChevronDown } from 'react-icons/bi';
import { ModeToggle } from '@/components/ui/mode_toggle';

interface HeaderProps {
  // Ajoute ici les props si nécessaire
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="relative flex justify-between bg-white p-4 shadow-light dark:bg-dark dark:shadow-dark-mode md:px-8">
      {/* Logo */}
      <a href="/">
      <div className="text-xl font-bold text-color">FOODI</div>
      </a>

      {/* Navbar Desktop */}
      <nav className="hidden space-x-6 md:flex">
        <a
          href="/"
          className="font-semibold text-dark hover:text-green-800 dark:text-color"
        >
          Home
        </a>
        <div className="group relative">
          <button className="flex items-center space-x-1 text-color hover:text-green-800">
            <span className="font-semibold text-dark hover:text-color dark:text-color">
              Menu
            </span>
            <BiChevronDown />
          </button>
          {/* Dropdown Menu */}
          <ul className="absolute mt-2 hidden rounded bg-white p-2 shadow group-hover:block text-color">
            <li>
              <a
                href="/petit-dejeuner"
                className="block w-full rounded px-2 py-1 hover:bg-dark text-nowrap"
              >
                Petit déjeuner
              </a>
            </li>
            <li>
              <a
                href="/dejeuner"
                className="block w-full rounded px-2 py-1 hover:bg-dark"
              >
                Déjeuner
              </a>
            </li>
            <li>
              <a
                href="/diner"
                className="block w-full rounded px-2 py-1 hover:bg-dark"
              >
                Dîner
              </a>
            </li>
          </ul>
        </div>
        <div className="group relative">
          <button className="flex items-center text-color hover:text-green-800">
            <span className="font-semibold text-dark hover:text-color dark:text-color">
              Services
            </span>
            <BiChevronDown />
          </button>
          {/* Dropdown Menu */}
          <ul className="absolute mt-2 hidden rounded bg-white p-2 shadow group-hover:block text-color">
            <li>
              <a
                href="/service-1"
                className="block w-full rounded px-2 py-1 hover:bg-dark text-nowrap"
              >
                Livraison rapide
              </a>
            </li>
            <li>
              <a
                href="/service-2"
                className="block w-full rounded px-2 py-1 hover:bg-dark text-nowrap"
              >
                Reservation de table
              </a>
            </li>
          </ul>
        </div>
        <a
          href="/about"
          className="font-semibold text-dark hover:text-color dark:text-color"
        >
          A propos de nous
        </a>
      </nav>

      {/* Navbar Mobile */}
      <nav className="absolute left-[15%] right-0 top-full z-10 mt-4 bg-white dark:bg-dark md:hidden">
        <ul className="flex gap-4">
          <li>
            <a
              href="/"
              className="block font-semibold text-dark hover:text-green-800 dark:text-color"
            >
              Home
            </a>
          </li>
          <li>
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-dark hover:text-green-800 dark:text-color">
                Menu <BiChevronDown />
              </summary>
              <ul className="absolute mt-2 hidden space-y-1 rounded bg-white text-color group-hover:block">
                <li>
                  <a
                    href="/petit-dejeuner"
                    className="block w-full rounded px-2 py-1 hover:bg-dark"
                  >
                    Petit déjeuner
                  </a>
                </li>
                <li>
                  <a
                    href="/dejeuner"
                    className="block w-full rounded px-2 py-1 hover:bg-dark"
                  >
                    Déjeuner
                  </a>
                </li>
                <li>
                  <a
                    href="/diner"
                    className="block w-full rounded px-2 py-1 hover:bg-dark"
                  >
                    Dîner
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-dark hover:text-green-800 dark:text-color">
                Services <BiChevronDown />
              </summary>
              <ul className="absolute mt-2 hidden space-y-1 rounded bg-white text-color group-hover:block">
                <li>
                  <a
                    href="/service-1"
                    className="block w-full rounded px-2 py-1 hover:bg-dark"
                  >
                    Livraison rapide
                  </a>
                </li>
                <li>
                  <a
                    href="/service-2"
                    className="block w-full rounded px-2 py-1 hover:bg-dark"
                  >
                    Reservation de table
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <a
          href="/about"
          className="font-semibold text-dark hover:text-color dark:text-color"
        >
          A propos 
        </a>
        </ul>
      </nav>

      {/* Search, Cart, and Contact */}
      <div className="flex items-center space-x-4">
        <FiSearch
          className="cursor-pointer font-semibold text-dark hover:text-color dark:text-color"
          size={20}
        />
        <ModeToggle />
        <button className="flex items-center space-x-2 rounded-full bg-color px-4 py-2 text-white">
          <FaPhoneAlt size={20} />
          <span>Contact</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
