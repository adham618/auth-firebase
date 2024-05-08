import { defineConfig } from "cypress";
import { plugin as cypressFirebasePlugin } from "cypress-firebase";
import admin from "firebase-admin";

require("dotenv").config();
require("dotenv").config({ path: ".env.local" });

export default defineConfig({
  projectId: "7ymsq5",
  experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,
  env: {
    CYPRESS_TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL,
    CYPRESS_TEST_PASSWORD: process.env.CYPRESS_TEST_PASSWORD,
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    TEST_UID: process.env.TEST_UID,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    // NOTE: Add "supportFile" setting if separate location is used
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
      return cypressFirebasePlugin(on, config, admin, {
        // Here is where you can pass special options.
        // If you have not set the GCLOUD_PROJECT environment variable, give the projectId here, like so:
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!,
        }),
        // if your databaseURL is not just your projectId plus ".firebaseio.com", then you _must_ give it here, like so:
        //    databaseURL: 'some-project-default-rtdb.europe-west1.firebasedatabase.app',
      });
    },
  },
});
