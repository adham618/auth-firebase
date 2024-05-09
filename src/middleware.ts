import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./config/server-config";

const PUBLIC_PATHS = ["/login"];

export async function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_CI_ENV) {
    return NextResponse.next();
  }

  // Importing only if middleware is to be enabled
  const { authMiddleware, redirectToHome, redirectToLogin } = await import(
    "next-firebase-auth-edge"
  );

  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }
      return NextResponse.next({
        request: { headers },
      });
    },
    handleInvalidToken: async (reason) => {
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|favicon.ico|__/auth|__/firebase|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
