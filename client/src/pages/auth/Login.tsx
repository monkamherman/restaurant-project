import SEO from '@/components/ui/SEO'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
 
const Login: React.FC = () => {
  const { login } = useAuth();
  return (
    <>
      <SEO
        title='Login - Access Your iPhone Store Account'
        description='Sign in to your account to shop for the latest fresh news, manage your account, and enjoy personalized services.'
      />

      <>
      <h1>Page de connexion</h1>
      <button onClick={login}>Se connecter</button>

      </>
    </>
  )
}

export default Login
