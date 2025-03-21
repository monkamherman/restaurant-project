import React from 'react';
import SEO from '@/components/ui/SEO';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const registerSchema = z.object({
  nom: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  email: z.string().email('Veuillez entrer une adresse email valide'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nom: '',
      email: '',
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    // Stocker les données dans le localStorage
    localStorage.setItem('userData', JSON.stringify(data));
    alert('Inscription réussie ! Veuillez vérifier votre OTP.');
  };

  return (
    <>
      <SEO
        title="Register - Create Your iPhone Store Account"
        description="Join us today! Create an account to enjoy fully in your private own spaces, exclusive offers, and faster services."
      />
      <div className="h-screen-2/3 flex w-full items-center justify-center">
        <div className="flex h-80 w-10/12 flex-col items-center justify-center p-4 shadow-light dark:shadow-dark-mode md:w-2/6">
          <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white text-center">
            Inscription
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark dark:text-white">
                      Nom
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-dark dark:text-white"
                        placeholder="Entrez votre nom"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark dark:text-white">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-dark dark:text-white"
                        placeholder="Entrez votre email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                S'inscrire
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
