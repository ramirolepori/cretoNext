'use client';

import { useState, useTransition, useEffect } from 'react';
import { authenticate } from '../lib/actions';
import { AuthFormData } from '../lib/types'; // Importar tipo
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

export default function LoginForm() {
  const [email, setEmail] = useState<string>(''); // Tipado de estado
  const [password, setPassword] = useState<string>(''); // Tipado de estado
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Tipado de estado
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Estado de autenticación
  const [isPending, startTransition] = useTransition();

  // Manejar redirección o efectos secundarios cuando cambie isAuthenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Redirigir o realizar alguna acción adicional
      console.log('Autenticado correctamente');
      // Ejemplo: window.location.href = '/dashboard';
    }
  }, [isAuthenticated]);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!email || !password) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }
    console.log('Usuario:', email);
    console.log('Contraseña:', password);
    
    event.preventDefault(); // Evitar comportamiento predeterminado del formulario

    startTransition(async () => {
      setErrorMessage(null); // Limpiar mensaje de error anterior
      const formData = new FormData();
      formData.append('usuario', email);
      formData.append('contrasena', password);

      const error = await authenticate(undefined, formData); // Llamada a la acción del servidor

      if (error) {
        setErrorMessage(error); // Mostrar mensaje de error si lo hay
        setIsAuthenticated(false); // Autenticación fallida
      } else {
        setIsAuthenticated(true); // Autenticación exitosa
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-black">
      <div className="hidden md:flex md:w-3/5 bg-black items-center justify-center p-8">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f82866205f852c8b658deb2c1f1fd23f_cretogif-sKujZOpufX22CumIuDfZqq0mmvFsPB.gif"
            alt="Abstract network visualization"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-full md:w-2/5 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Sign Up</h2>
            <p className="mt-2 text-sm text-gray-400">
              Start your journey with us today
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="Email" className="text-sm font-medium text-gray-300">
                  Usuario
                </Label>
                <Input
                  id="usuario"
                  name="usuario"
                  type="text"
                  className="h-10 border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white placeholder-gray-500 focus:border-white focus:ring-white"
                  placeholder="Enter your username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Actualizar estado
                />
              </div>
              <div>
                <Label htmlFor="Password" className="text-sm font-medium text-gray-300">
                  Contraseña
                </Label>
                <Input
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  className="h-10 border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white placeholder-gray-500 focus:border-white focus:ring-white"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Actualizar estado
                />
              </div>
            </div>
            <div className="space-y-4">
              <Button
                aria-disabled={isPending}
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-white text-black hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 rounded-lg"
              >
                Sign Up
              </Button>
              <div className="text-center">
                {errorMessage && (
                  <>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
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
