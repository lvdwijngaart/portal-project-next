"use client";

import { logout } from "@/features/auth/actions";

export const LogoutButton = () => {
    return (
        <button onClick={() => logout()}>
            Sign lout
        </button>
    );
}