// firebase-config.js
// Shared Firebase setup — used by admin-login.html and admin-dashboard.html

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { initializeFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-qI_oXJrmMT59UtRIWf9sHJfZD1myLT0",
  authDomain: "sri-krishna-steels-c1ce6.firebaseapp.com",
  projectId: "sri-krishna-steels-c1ce6",
  storageBucket: "sri-krishna-steels-c1ce6.firebasestorage.app",
  messagingSenderId: "672755744053",
  appId: "1:672755744053:web:150c5839ff772c22c6a07c",
  measurementId: "G-DT421N5ZQT"
};

const app = initializeApp(firebaseConfig);

// Some networks/firewalls block Firestore's default streaming connection,
// causing writes to hang forever. This forces a fallback to long-polling,
// which works on virtually any network.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true
});

export const auth = getAuth(app);
