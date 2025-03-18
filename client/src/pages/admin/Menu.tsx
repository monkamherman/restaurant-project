import React from 'react'
import { FormAddDish } from './component/FormAddDish';
import { DishList } from './component/DishList';

const Menu: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Gestion du Menu</h1>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Ajouter un Plat</h2>
        <FormAddDish />
      </section>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Liste des Plats</h2>
        <DishList category="Entrées" />
        <DishList category="Plats Principaux" />
        <DishList category="Desserts" />
      </section>
    </div>
  )
}

export default Menu
