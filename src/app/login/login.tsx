"use client";

import { loginWithCredential } from "@/api";
import { Button } from "@/components/ui/button";
import { UserCredential, getRedirectResult } from "firebase/auth";
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
        <div>
          <Button
            size={"lg"}
            // loading={isGoogleUsingRedirectLoading}
            disabled={isGoogleUsingRedirectLoading}
            onClick={handleLoginWithGoogleUsingRedirect}
          >
            Log in with Google
          </Button>
          {googleUsingRedirectError && (
            <div className="text-red-500">
              {googleUsingRedirectError.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
