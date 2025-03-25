import SEO from '@/components/ui/SEO';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
// import { axiosUser } from '@/components/api/user';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {  useNavigate } from "react-router-dom";
import { fetchWrapper } from '@/utils/fetchWrapper';

interface VerifyOTPResponse {
  data: {
    msg: string;
  };
}

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const { toast } = useToast();
  const navigate = useNavigate();


  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const response: VerifyOTPResponse = await fetchWrapper('http://localhost:4000/user/verify-otp', {
        method: 'POST',
        body: { email: userData.email, otp },
      });
      if (response.data.msg === 'OTP validé avec succès') {
        toast({
          title: 'OTP validé',
          description: 'Vous pouvez maintenant ajouter votre numéro de téléphone.',
        });
        navigate ('/final-submit');
      } else {
        setError('Code OTP invalide');
      }
    } catch (error) {
      toast({
        title: 'Code invalide',
        description: 'Vérifiez votre code OTP et réessayez.',
        variant: 'destructive',
      });
      console.error(error);
      
    }
  };

  const handleResendOTP = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
       await fetchWrapper('http://localhost:4000/user/resend-otp', {
        method: 'POST',
        body: { email: userData.email },
      });

      toast({
        title: 'OTP renvoyé',
        description: 'Un nouveau code OTP a été envoyé à votre email.',
      });

      setCountdown(120); // Réinitialiser le décompte
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Une erreur s'est produite lors de l'envoi de l'OTP.",
        variant: 'destructive',
      });
      console.error(error);
      
    }
  };

  return (
    <>
      <SEO
        title="Verify OTP - Secure Your Account"
        description="Enter the OTP sent to your email or phone to verify your account and continue moving securely in your account."
      />
      <div className="h-screen-2/3 flex w-full items-center justify-center">
        <div className="flex h-80 w-10/12 flex-col items-center justify-center p-4 shadow-light dark:shadow-dark-mode md:w-2/6">
          <h1 className="mb-4 text-center text-2xl font-bold text-dark dark:text-white">
            Vérification OTP
          </h1>
          <p className="text-dark dark:text-white">
            Veuillez entrer le code OTP envoyé à votre email.
          </p>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Entrez votre OTP"
            className="mt-4 text-dark dark:text-white"
          />
          {error && <p className="mt-2 text-red-500">{error}</p>}
          <Button onClick={handleSubmit} className="mt-4 w-full">
            Valider OTP
          </Button>
          <Button
            onClick={handleResendOTP}
            disabled={countdown > 0}
            className="mt-2 w-full"
          >
            {countdown > 0 ? `Renvoyer OTP (${countdown}s)` : 'Renvoyer OTP'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;