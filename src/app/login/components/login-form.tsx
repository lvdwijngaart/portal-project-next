"use client";

import { useActionState, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { authenticate } from "@/app/login/services/authenticate";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate, 
    undefined
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Log in to your account</h2>
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      
      <form action={formAction}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}