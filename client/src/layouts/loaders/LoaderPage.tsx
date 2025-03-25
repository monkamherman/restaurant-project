import React from 'react'
import UserMenu from '@/pages/auth/useMenu'

const LoaderPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // Récupérer les données de l'utilisateur depuis le localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const isLoggedIn = !!userData.email; // Vérifier si l'utilisateur est connecté

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="loader">
      {children}
      {isLoggedIn && <UserMenu nom={userData.nom} email={userData.email} />}
      </div>
    </section>
  )
}

export default LoaderPage
