import { buttonVariants } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Next.js page showcasing next-firebase-auth-edge features",
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4 font-medium">Home page protected</h1>
      <h2 className="text-2xl mb-4">You are logged in</h2>
      <Link
        href="/profile"
        className={buttonVariants({
          size: "sm",
        })}
      >
        Go to profile page
      </Link>
    </main>
  );
}
