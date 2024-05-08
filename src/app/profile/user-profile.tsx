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
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    await logout();

    router.refresh();

    setHasLoggedOut(true);
  });

  if (!user) {
    return null;
  }

  return (
    <div className="text-center space-y-4 flex items-center justify-center flex-col">
      <h2>You are logged in as</h2>
      <div>
        {user.photoURL && (
          <Image width={100} height={100} src={user.photoURL} alt="avatar" />
        )}
      </div>
      <span>{user.email}</span>

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
