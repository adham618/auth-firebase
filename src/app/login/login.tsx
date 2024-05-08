"use client";

import { loginWithCredential } from "@/api";
import { Button } from "@/components/ui/button";
import { User, onAuthStateChanged } from "firebase/auth";
import * as React from "react";
import { useLoadingCallback } from "react-loading-hook";
import { getFirebaseAuth } from "../../hooks/auth/firebase";
import { useRedirectAfterLogin } from "../../shared/useRedirectAfterLogin";
import { useRedirectParam } from "../../shared/useRedirectParam";
import { getGoogleProvider, loginWithProviderUsingRedirect } from "./firebase";

export default function Login() {
  const [hasLogged, setHasLogged] = React.useState(false);
  const redirect = useRedirectParam();
  const redirectAfterLogin = useRedirectAfterLogin();

  async function handleLogin(credential: User) {
    await loginWithCredential(credential);
    // check if auth state changed

    redirectAfterLogin();
  }

  const [
    handleLoginWithGoogleUsingRedirect,
    isGoogleUsingRedirectLoading,
    googleUsingRedirectError,
  ] = useLoadingCallback(async () => {
    setHasLogged(false);

    const auth = getFirebaseAuth();

    // User is signed in.
    setHasLogged(true);

    // Initiate Google login with redirect
    await loginWithProviderUsingRedirect(auth, getGoogleProvider(auth));
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), async (user) => {
      if (user) {
        // User is signed in.
        handleLogin(user);
        setHasLogged(true);
      } else {
        // User is signed out.
        setHasLogged(false);
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {hasLogged && (
        <div>
          <span>
            Redirecting to <strong>{redirect || "/"}</strong>
          </span>
        </div>
      )}
      {!hasLogged && (
        <div className="flex flex-col items-center justify-center">
          <Button
            size="lg"
            // loading={isGoogleUsingRedirectLoading}
            disabled={isGoogleUsingRedirectLoading}
            onClick={handleLoginWithGoogleUsingRedirect}
          >
            Log in with Google
          </Button>
          {googleUsingRedirectError && (
            <div className="text-red-500 mt-4">
              {googleUsingRedirectError.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
