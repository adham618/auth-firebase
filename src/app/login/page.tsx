import { Metadata } from "next";
import Login from "./login";

export const metadata: Metadata = {
  title: "Login",
  description: "Next.js page showcasing next-firebase-auth-edge features",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Login />
    </main>
  );
}
