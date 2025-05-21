"use server";

import { login } from "@/features/auth/actions";
import { auth } from "@/features/auth/auth";
import { LoginForm } from "@/features/auth/components/login-form";
import { LogoutButton } from "@/features/auth/components/logout-button";
import Image from "next/image";

export default async function Login() {

    const session = await auth();
    
    if (session?.user) {
        return <div>
            <h1> NextAuth v5 + Next 15 </h1>
            <p> User signed in with name: {session.user.name} </p>
            { session.user.image && 
                <Image src={session.user.image} width={48} height={48} alt="Avatar"/>
            }
            <LogoutButton />
        </div>
    }

    return (
        <div>
            <h1>Login</h1>
            <p>Login page</p>
            <LoginForm />
        </div>
    );
}