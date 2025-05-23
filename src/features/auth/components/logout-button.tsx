"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button 
      onClick={() => signOut()}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Sign lout
    </button>
  );
}