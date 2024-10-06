'use client'
import { FormEvent, useState, useEffect } from "react";
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Label from "@/components/ui/label"
import { Eye, EyeOff } from 'lucide-react'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { z } from 'zod';

// Definir el esquema de validación con Zod
const formSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }),
    email: z.string().email({ message: "Debe ser un email válido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z.string().min(6, { message: "La confirmación de contraseña debe tener al menos 6 caracteres" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
});

export default function Form() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar el formulario con Zod
        const result = formSchema.safeParse({
            name,
            email,
            password,
            confirmPassword,
        });

        if (!result.success) {
            // Si hay errores de validación, muestra el primer error
            setError(result.error.errors[0]?.message || "Error en el formulario");
            return;
        }

        setError(null); // Limpia el error si todo está bien
        const form = new FormData(e.currentTarget);
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: form.get('name'),
                email: form.get('email'),
                password: form.get('password'),
            }),
        });
        const data = await res.json();
        if (data?.error) {
            setError(data.error); // Muestra el error si ocurre
        } else {
            setShowSuccess(true); // Muestra la pantalla de éxito
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }


    if (showSuccess) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-transparent border border-gray-600 p-8 rounded-lg shadow-lg text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
                    >
                        <CheckCircle className="w-20 h-20 mx-auto text-green-400" />
                    </motion.div>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-4 text-2xl font-bold text-white"
                    >
                        ¡Registro Exitoso!
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="mt-2 text-gray-300"
                    >
                        Tu cuenta ha sido creada correctamente.
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="w-full max-w-md space-y-8 p-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold">Registro</h2>
                    <p className="mt-2 text-sm text-gray-400">Comienza tu viaje con nosotros hoy</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="nombre" className="block text-sm font-medium mb-1">
                                Nombre
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                className="w-full px-3 py-2 bg-[#1e1e1e] border border-[#333333] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                placeholder="Ingresa tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                className="w-full px-3 py-2 bg-[#1e1e1e] border border-[#333333] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="block text-sm font-medium mb-1">
                                Contraseña
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 bg-[#1e1e1e] border border-[#333333] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
                                Confirmar Contraseña
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 bg-[#1e1e1e] border border-[#333333] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    placeholder="Confirma tu contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Registrarse
                    </Button>
                    <div className="text-center">
                        {error && (
                            <>
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                <p className="text-sm text-red-500">{error}</p>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}