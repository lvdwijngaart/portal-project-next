"use server";

import { auth } from "@/features/auth/services/auth";
import { LoginForm } from "@/app/login/components/login-form";
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