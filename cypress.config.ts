import { defineConfig } from "cypress";
import { plugin as cypressFirebasePlugin } from "cypress-firebase";
import admin from "firebase-admin";

require("dotenv").config();
require("dotenv").config({ path: ".env.local" });

export default defineConfig({
  projectId: "7ymsq5",
  env: {
    TEST_UID: process.env.TEST_UID,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    // NOTE: Add "supportFile" setting if separate location is used
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
      return cypressFirebasePlugin(on, config, admin, {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!,
        }),
      });
    },
  },
});
