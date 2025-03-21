import React from 'react';
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
import SEO from '@/components/ui/SEO';

const finalSubmitSchema = z.object({
  numero: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Numéro de téléphone invalide'),
});

type FinalSubmitFormValues = z.infer<typeof finalSubmitSchema>;

const FinalSubmit: React.FC = () => {
  const form = useForm<FinalSubmitFormValues>({
    resolver: zodResolver(finalSubmitSchema),
    defaultValues: {
      numero: '',
    },
  });

  const onSubmit = (data: FinalSubmitFormValues) => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const finalData = { ...userData, numero: data.numero };
    localStorage.setItem('finalData', JSON.stringify(finalData));
    alert('Soumission finale réussie !');
  };
  return (
    <>
      <SEO
        title="final submite - Secure Your Account"
        description="Enter your number to finsh to creat your accounty and continue moving securely in your account."
      />
      <div className="flex items-center justify-center w-full h-screen-2/3">
        <div className="w-10/12 md:w-2/6 h-80 p-4 flex flex-col justify-center items-center shadow-light dark:shadow-dark-mode ">
        <h1 className="mb-4 text-2xl font-bold text-center text-dark dark:text-white">Soumission Finale</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-dark dark:text-white'>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input className='text-dark dark:text-white' placeholder="658852731" {...field} />
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
