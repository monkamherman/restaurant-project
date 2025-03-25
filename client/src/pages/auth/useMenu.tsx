import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { fetchWrapper } from '@/utils/fetchWrapper';


interface UserMenuProps {
  nom: string;
  email: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ nom, email }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // Appel API pour la déconnexion
      await fetchWrapper('http://localhost:4000/user/complete', {
        method: 'POST',
        // body: { ...userData, numero: data.numero },
        credentials: 'include', // Important pour les cookies
      });

      // Supprimer les données de l'utilisateur du localStorage
      localStorage.removeItem('userData');
      localStorage.removeItem('finalData');

      // Afficher un toast de succès
      toast({
        title: 'Déconnexion réussie',
        description: 'Vous avez été déconnecté avec succès.',
      });

      // Rediriger vers la page de connexion
      navigate ('/');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Une erreur s'est produite lors de la déconnexion.",
        variant: 'destructive',
      });
      console.error(error);
      
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        {/* Bouton avec la première lettre du nom */}
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
        >
          {nom.charAt(0).toUpperCase()}
        </Button>

        {/* Menu déroulant */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {nom}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {email}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Déconnexion
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;