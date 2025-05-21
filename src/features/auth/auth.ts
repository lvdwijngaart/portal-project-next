import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import postgres from "postgres";
import { User } from "@/types/user";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`;
        return user[0];
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user'); 
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        // Github, 
        Credentials({
            async authorize(credentials, req) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                    if (!user) return null

                    const passwordMatch = await bcryptjs.compare(password, user.password);
                    if (passwordMatch) return user;
                }

                console.log("Invalid credentials");
                return null;
            }
        }),
    ],
});