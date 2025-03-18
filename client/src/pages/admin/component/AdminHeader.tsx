import React from 'react'
const AdminHeader: React.FC = () => {
  return (
    <div className='p-4 border-b-2 border-color'>
      <div className="flex justify-center items-center gap-4">
        <a href="/admin-menu" className='font-semibold active:text-color link-underline '>Menu</a>
        <a href='/admin-commande' className='font-semibold active:text-color link-underline '>commande</a>
        <a href='/admin-commande' className='font-semibold active:text-color link-underline '>reservation</a>
        <a href='/admin-commande' className='font-semibold active:text-color link-underline '>avis</a>
      </div>
    </div>
  )
}

export default AdminHeader
