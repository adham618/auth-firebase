import { authConfig } from "@/config/server-config";
import { AuthProvider } from "@/hooks/auth/AuthProvider";
import { toUser } from "@/shared/user";
import "@/styles/globals.css";
import { Metadata } from "next";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "firebase-auth-edge example",
  description: "Next.js page showcasing next-firebase-auth-edge features",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens = await getTokens(cookies(), authConfig);
  // const user = tokens ? toUser(tokens) : null;
  const user =
    process.env.NEXT_PUBLIC_CI_ENV === "true"
      ? {
          uid: "tPaNDwNmyKRZOxmVtoq3JKBTBPt2",
          email: "e2e-test-only-for-ci@gmail.com",
          displayName: "e2e-test-only-for-ci",
          photoURL:
            "https://lh3.googleusercontent.com/a/ACg8ocLzsKyzjg-LKNZTrXrg6GsiERArNHQlhSXEW9FIq3yKHhAhEg=s96-c",
          phoneNumber: null,
          emailVerified: true,
          providerId: "google.com",
          customClaims: {},
        }
      : tokens
      ? toUser(tokens)
      : null;

  console.log("user", user);

  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider user={user}>{children}</AuthProvider>
      </body>
    </html>
  );
}
