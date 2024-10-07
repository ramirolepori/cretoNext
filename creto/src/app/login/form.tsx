'use client';

import { FormEvent, useState, useTransition } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import CustomImage from '@/components/ui/image';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { z } from 'zod';
import { Eye, EyeOff } from "lucide-react"


// Definir el esquema de validación con Zod
const formSchema = z.object({
  email: z.string().email({ message: "Debe ser un email válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export default function Form() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false)
  const [isPending] = useTransition();

  const router = useRouter();

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitar recargar la página

    // Validar el formulario con Zod
    const result = formSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      // Si hay errores de validación, muestra el primer error
      setError(result.error.errors[0]?.message || "Error en el formulario");
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
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* GIF background for mobile with reduced blur */}
      <div className="fixed inset-0 md:hidden">
        <CustomImage
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f82866205f852c8b658deb2c1f1fd23f_cretogif-sKujZOpufX22CumIuDfZqq0mmvFsPB.gif"
          alt="Abstract network visualization"
          className="w-full h-full object-cover filter blur"
        />
        <div className="absolute inset-0 bg-black opacity-75" /> {/* Reduced opacity from 60 to 40 */}
      </div>

      {/* GIF for desktop */}
      <div className="hidden md:flex md:w-3/5 bg-black items-center justify-center p-8">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
          <CustomImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f82866205f852c8b658deb2c1f1fd23f_cretogif-sKujZOpufX22CumIuDfZqq0mmvFsPB.gif"
            alt="Abstract network visualization"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Sign Up form */}
      <div className="w-full md:w-2/5 flex items-center justify-center p-4 md:p-8 relative z-10">
        <div className="w-full max-w-md bg-black bg-opacity-70 p-6 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Sign Up</h2>
            <p className="mt-2 text-xs md:text-sm text-gray-400">
              Start your journey with us today
            </p>
          </div>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="usuario" className="text-sm font-medium text-gray-300">
                Email
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
              <div className="relative">
                <Label htmlFor="contrasena" className="text-sm font-medium text-gray-300">
                  Contraseña
                </Label>
                <div className="relative mt-1">
                  <Input
                  id="password"
                  name="password"
                  type="password"
                  className="h-10 border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white placeholder-gray-500 focus:border-white focus:ring-white"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-center">
                <a href="#" className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
                  ¿Olvidaste la contraseña?
                </a>
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
