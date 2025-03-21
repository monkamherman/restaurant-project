import SEO from '@/components/ui/SEO';
import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // Simuler une vérification OTP
    if (otp === '123456') {
      alert('OTP validé !');
      window.location.href = '/final-submit'; // Redirection vers FinalSubmit
    } else {
      setError('Code OTP invalide');
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
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
