"use client";

import { logout } from "@/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/AuthContext";
import { getFirebaseAuth } from "@/hooks/auth/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useLoadingCallback } from "react-loading-hook";

export function UserProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [UserData, setUserData] = React.useState(user);
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    await logout();

    router.refresh();

    setHasLoggedOut(true);
  });

  React.useEffect(() => {
    process.env.NEXT_PUBLIC_CI_ENV === "true"
      ? setUserData({
          uid: "tPaNDwNmyKRZOxmVtoq3JKBTBPt2",
          email: "e2e-test-only-for-ci@gmail.com",
          displayName: "e2e-test-only-for-ci",
          photoURL:
            "https://lh3.googleusercontent.com/a/ACg8ocLzsKyzjg-LKNZTrXrg6GsiERArNHQlhSXEW9FIq3yKHhAhEg=s96-c",
          phoneNumber: null,
          emailVerified: true,
          providerId: "google.com",
          customClaims: {},
        })
      : setUserData(user);
  }, [user]);

  if (!UserData) {
    return null;
  }

  return (
    <div className="text-center space-y-4 flex items-center justify-center flex-col">
      <h2>You are logged in as</h2>
      <div>
        {UserData.photoURL && (
          <Image
            width={100}
            height={100}
            src={UserData.photoURL}
            alt="avatar"
          />
        )}
      </div>
      <span>{UserData.email}</span>

      <Button
        // loading={isLogoutLoading || hasLoggedOut}
        disabled={isLogoutLoading || hasLoggedOut}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </div>
  );
}
