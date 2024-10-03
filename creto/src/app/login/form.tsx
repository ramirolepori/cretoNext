'use client';

import { FormEvent, useState, useTransition } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import CustomImage from '@/components/ui/image';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function Form() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isPending] = useTransition();
  const router = useRouter();

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitar recargar la página

    // Validación de campos vacíos
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Inicia el proceso de login
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
        email: form.get('email') as string,
        password: form.get('password') as string,
        redirect: false,
    });
    if (res?.error) {
      setError(res.error); // Muestra el error si ocurre
    } else {
      // Si no hay errores, redirecciona
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <div className="hidden md:flex md:w-3/5 bg-black items-center justify-center p-8">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
          <CustomImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f82866205f852c8b658deb2c1f1fd23f_cretogif-sKujZOpufX22CumIuDfZqq0mmvFsPB.gif"
            alt="Abstract network visualization"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-full md:w-2/5 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Login</h2>
            <p className="mt-2 text-sm text-gray-400">
              Start your journey with us today
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Usuario
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  className="h-10 border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white placeholder-gray-500 focus:border-white focus:ring-white"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="h-10 border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white placeholder-gray-500 focus:border-white focus:ring-white"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <Button
                aria-disabled={isPending}
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-white text-black hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 rounded-lg"
              >
                Login
              </Button>
              <div className="text-center">
                {error && (
                  <>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{error}</p>
                  </>
                )}
                <p className="text-sm text-gray-400">info@creto.com</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
