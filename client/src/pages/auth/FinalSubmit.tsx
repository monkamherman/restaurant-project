import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { axiosUser } from '@/components/api/user';
import { fetchWrapper } from '@/utils/fetchWrapper';

import {  useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import SEO from '@/components/ui/SEO';
import { useToast } from '@/hooks/use-toast';

const finalSubmitSchema = z.object({
  numero: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Numéro de téléphone invalide'),
});

type FinalSubmitFormValues = z.infer<typeof finalSubmitSchema>;

const FinalSubmit: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FinalSubmitFormValues>({
    resolver: zodResolver(finalSubmitSchema),
    defaultValues: {
      numero: '',
    },
  });

  const onSubmit = async (data: FinalSubmitFormValues) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');

      // Appel API pour finaliser la création du compte
     await fetchWrapper('http://localhost:4000/user/complete', {
        method: 'POST',
        body: { ...userData, numero: data.numero },
        credentials: 'include', // Important pour les cookies
      });

      localStorage.removeItem('userData');
      toast({
        title: 'Compte créé',
        description: 'Votre compte a été créé avec succès.',
      });

      // Rediriger vers la page de connexion
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Une erreur s'est produite lors de la création du compte.",
        variant: 'destructive',
      });
      console.error(error);
      
    }
  };

  return (
    <>
      <SEO
        title="Final Submit - Secure Your Account"
        description="Enter your number to finish creating your account and continue moving securely in your account."
      />
      <div className="flex items-center justify-center w-full h-screen-2/3">
        <div className="w-10/12 md:w-2/6 h-80 p-4 flex flex-col justify-center items-center shadow-light dark:shadow-dark-mode ">
          <h1 className="mb-4 text-2xl font-bold text-center text-dark dark:text-white">
            Soumission Finale
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark dark:text-white">
                      Numéro de téléphone
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-dark dark:text-white"
                        placeholder="+1234567890"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Soumettre
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FinalSubmit;