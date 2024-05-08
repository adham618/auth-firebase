import { attachCustomCommands } from "cypress-firebase";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

const fbConfig = {
  apiKey: "AIzaSyCzoWQRvm1cpF2yP2l0vQFWe5M_9UQPUF4",
  authDomain: "cypress-firebase-auth.firebaseapp.com",
  projectId: "cypress-firebase-auth",
  storageBucket: "cypress-firebase-auth.appspot.com",
  messagingSenderId: "662579692172",
  appId: "1:662579692172:web:f30bf4ebd1b1de1bb231a9",
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
