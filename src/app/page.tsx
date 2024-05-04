import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

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
