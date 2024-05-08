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
  const user = tokens ? toUser(tokens) : null;

  return (
    <html lang="en">
      <head />
      <body>
        {process.env.NEXT_PUBLIC_CI_ENV === "true" ? (
          <>{children}</>
        ) : (
          <AuthProvider user={user}>{children}</AuthProvider>
        )}
      </body>
    </html>
  );
}
