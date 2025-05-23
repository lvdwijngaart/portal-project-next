
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { getUser } from "./db-actions";


// Auth configuration without server directive
export const nextAuthConfig = {
  providers: [
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

          if (!user) return null;

          const passwordMatch = await bcryptjs.compare(password, user.password);
          if (passwordMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      }
    }),
  ],
};

// Export the NextAuth instance
export const { auth, handlers, signIn, signOut } = NextAuth(nextAuthConfig);