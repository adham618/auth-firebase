import { Metadata } from "next";
import { UserProfile } from "./user-profile";

export const metadata: Metadata = {
  title: "Profile",
  description: "Next.js page showcasing next-firebase-auth-edge features",
};

export default async function Profile() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4 font-medium">Profile page protected</h1>
      <UserProfile />
    </main>
  );
}
