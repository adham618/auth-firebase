"use client";

import { loginWithCredential } from "@/api";
import { UserCredential, getRedirectResult } from "firebase/auth";
import * as React from "react";
import { useLoadingCallback } from "react-loading-hook";
import { getFirebaseAuth } from "../../hooks/auth/firebase";
import { useRedirectAfterLogin } from "../../shared/useRedirectAfterLogin";
import { useRedirectParam } from "../../shared/useRedirectParam";
import { getGoogleProvider, loginWithProviderUsingRedirect } from "./firebase";

export function LoginPage() {
  const [hasLogged, setHasLogged] = React.useState(false);
  const redirect = useRedirectParam();
  const redirectAfterLogin = useRedirectAfterLogin();

  async function handleLogin(credential: UserCredential) {
    await loginWithCredential(credential);
    redirectAfterLogin();
  }

  const [
    handleLoginWithGoogleUsingRedirect,
    isGoogleUsingRedirectLoading,
    googleUsingRedirectError,
  ] = useLoadingCallback(async () => {
    setHasLogged(false);

    const auth = getFirebaseAuth();
    await loginWithProviderUsingRedirect(auth, getGoogleProvider(auth));

    setHasLogged(true);
  });

  async function handleLoginWithRedirect() {
    const auth = getFirebaseAuth();
    const credential = await getRedirectResult(auth);

    if (credential?.user) {
      await handleLogin(credential);

      setHasLogged(true);
    }
  }

  React.useEffect(() => {
    handleLoginWithRedirect();
  }, []);

  return (
    <div>
      <h1>Login</h1>
      {hasLogged && (
        <div>
          <span>
            Redirecting to <strong>{redirect || "/"}</strong>
          </span>
        </div>
      )}
      {!hasLogged && (
        <div>
          <button
            // loading={isGoogleUsingRedirectLoading}
            disabled={isGoogleUsingRedirectLoading}
            onClick={handleLoginWithGoogleUsingRedirect}
          >
            Log in with Google (Redirect)
          </button>
          {googleUsingRedirectError && (
            <div className="">{googleUsingRedirectError.message}</div>
          )}
        </div>
      )}
    </div>
  );
}
