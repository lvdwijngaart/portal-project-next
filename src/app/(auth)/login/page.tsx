
import { auth } from "@/features/auth/services/auth";
import { LoginForm } from "@/features/auth/components/login-form";
import Image from "next/image";
import { LogoutButton } from "../../../features/auth/components/logout-button";

import "./styles.css";

export default async function Login() {  
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
}
