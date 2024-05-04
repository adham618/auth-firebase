import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>
        <span>Home protected</span>
      </h1>
      <div>
        <h2>You are logged in</h2>
        <Link href="/profile">
          <button>Go to profile page</button>
        </Link>
      </div>
    </main>
  );
}
