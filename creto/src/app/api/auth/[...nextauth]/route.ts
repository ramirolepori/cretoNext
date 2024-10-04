import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";


const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                //
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email y contraseña son requeridos");
                }
                // Busca el email en la tabla 'clientes'
                const email = credentials.email;
                const clientResult = await sql<{ id: number; nombre: string; email: string }>`
                    SELECT id, nombre, email 
                    FROM clientes 
                    WHERE email = ${email};
                `;
                const user = clientResult.rows[0];

                if (!user) {
                    throw new Error("Usuario no encontrado");
                }

                // Busca el hash de la contraseña en la tabla 'logins'
                const cliente_id = user.id;
                const loginResult = await sql<{ password_hash: string }>`
                    SELECT password_hash 
                    FROM logins 
                    WHERE cliente_id = ${cliente_id};
                `;

                const loginData = loginResult.rows[0];

                if (!loginData) {
                    throw new Error("Contraseña no encontrada");
                }

                // Verifica el hash de la contraseña con bcrypt
                const isValidPassword = await compare(
                    credentials?.password || '',
                    loginData.password_hash
                );

                if (!isValidPassword) {
                    throw new Error("Contraseña incorrecta");
                }
                // Si todo está bien, devuelve el usuario
                return { id: user.id.toString(), email: user.email };

            }
        })]
});
export { handler as GET, handler as POST };