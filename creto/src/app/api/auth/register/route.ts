import { NextResponse } from "next/server";
import {hash} from "bcrypt";
import {sql} from "@vercel/postgres";

export async function POST(request:Request)  {
    try {
        const {name, email, password } = await request.json();
        //validar email y password


        const hashedPassword = await hash(password, 10);


        const responseUser = await sql`
        INSERT INTO clientes (nombre,email) 
        VALUES (${name},${email}) RETURNING id;`

        await sql`
        INSERT INTO logins (cliente_id, password_hash) 
        VALUES (${responseUser.rows[0].id},${hashedPassword});`

    } catch (e) {
        console.error({e});
    }

    return NextResponse.json({message: "success"});
}