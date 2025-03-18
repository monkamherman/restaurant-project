import React from 'react';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Créer un contexte pour l'authentification
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

interface AuthContextProps {
  children: ReactNode; // Specify the type for children
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider pour englober l'application
export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};