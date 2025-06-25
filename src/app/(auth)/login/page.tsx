

import { LoginForm } from "@/features/auth/components/login-form";

import "./styles.css";

export default async function Login() {  
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
}
