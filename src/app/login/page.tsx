import { Metadata } from "next";
import Login from "./login";

export const metadata: Metadata = {
  title: "Login",
  description: "Next.js page showcasing next-firebase-auth-edge features",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4 font-medium">Login</h1>
      <Login />
    </main>
  );
}
