import { defineConfig } from "cypress";
import { plugin as cypressFirebasePlugin } from "cypress-firebase";
import admin from "firebase-admin";

require("dotenv").config();
require("dotenv").config({ path: ".env.local" });

export default defineConfig({
  projectId: "7ymsq5",

  env: {
    FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    FIREBASE_MEeSSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    CYPRESS_TEST_UID:
      process.env.NEXT_PUBLIC_CI_ENV === "true"
        ? process.env.CYPRESS_CI_TEST_UID
        : process.env.CYPRESS_TEST_UID,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    // NOTE: Add "supportFile" setting if separate location is used
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
      return cypressFirebasePlugin(on, config, admin, {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        credential:
          process.env.NEXT_PUBLIC_CI_ENV === "true"
            ? admin.credential.cert(require("./serviceAccount.json"))
            : undefined,
      });
    },
  },
});
