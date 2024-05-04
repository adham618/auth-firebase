"use client";

import { logout } from "@/api";
import { useAuth } from "@/hooks/auth/AuthContext";
import { getFirebaseAuth } from "@/hooks/auth/firebase";
import { signOut } from "firebase/auth";
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
    <div>
      <div>
        <h3>You are logged in as</h3>
        <div>
          <div>{user.photoURL && <img src={user.photoURL} />}</div>
          <span>{user.email}</span>
        </div>

        <button
          // loading={isLogoutLoading || hasLoggedOut}
          disabled={isLogoutLoading || hasLoggedOut}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
