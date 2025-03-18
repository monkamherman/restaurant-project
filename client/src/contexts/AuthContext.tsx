import { createContext, useContext, useState } from 'react';

// Créer un contexte pour l'authentification
const AuthContext =  createContext();

// Provider pour englober l'application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fonction pour se connecter
  const login = () => {
    setIsAuthenticated(true);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);