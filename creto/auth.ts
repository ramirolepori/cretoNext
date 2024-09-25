import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { clientes, logins } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

// Función para obtener el usuario por email
async function getUserByEmail(email: string): Promise<clientes & { id: number } | undefined> {
  try {
    const userResult = await sql<{ id: number; nombre: string; email: string }[]>`
      SELECT id, nombre, email 
      FROM clientes 
      WHERE email = ${email};
    `;

    // Asegurarnos que obtenemos al menos un usuario
    if (userResult.rows.length === 0) {
      console.error('No user found with the provided email');
      return undefined;
    }

    // Devolvemos solo el primer usuario como objeto
    const user = userResult.rows[0]; // Accedemos al primer elemento del array

    // Devolvemos el usuario, asignando el id al tipo clientes & { id: number }
    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email
    } as clientes & { id: number }; // Explicitamente indicamos el tipo esperado

  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// Función para obtener el hash de la contraseña por cliente_id
async function getPasswordHash(cliente_id: number): Promise<string | undefined> {
  try {
    const hashResult = await sql<logins[]>`
      SELECT password_hash 
      FROM logins 
      WHERE cliente_id = ${cliente_id};
    `;
    return hashResult.rows[0]?.password_hash;
  } catch (error) {
    console.error('Failed to fetch password hash:', error);
    throw new Error('Failed to fetch password hash.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        usuario: { label: "Email", type: "text" },
        contrasena: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ usuario: z.string().email(), contrasena: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error('Invalid credentials format:', parsedCredentials.error);
          return null;
        }

        const { usuario, contrasena } = parsedCredentials.data;

        const user = await getUserByEmail(usuario);
        if (!user) {
          console.error('User not found with the provided email');
          return null;
        }

        const passwordHash = await getPasswordHash(user.id);
        if (!passwordHash) {
          console.error('Password hash not found for user');
          return null;
        }

        const passwordsMatch = await bcrypt.compare(contrasena, passwordHash);

        if (passwordsMatch) {
          return { id: user.id.toString(), name: user.nombre, email: user.email };
        }

        console.error('Invalid password provided');
        return null;
      },
    }),
  ],
});
