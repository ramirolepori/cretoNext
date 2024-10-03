'use client'
import { FormEvent } from "react";



export default function Form() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: form.get('name'),
                email: form.get('email'),
                password: form.get('password'),
            }),
        });
        console.log({ response });
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <input name="name" className="border border-black text-black" type="text" placeholder="name" />
            <input name="email" className="border border-black text-black" type="email" placeholder="email" />
            <input name="password" className="border border-black text-black" type="password" placeholder="password" />
            <button type="submit">Register</button>
        </form>
    )
}