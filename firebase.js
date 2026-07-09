import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD1JQA8nB0tvSzzTrKwHYTSkBwejtw4IIo",
    authDomain: "the-world-of-flavors.firebaseapp.com",
    projectId: "the-world-of-flavors",
    storageBucket: "the-world-of-flavors.firebasestorage.app",
    messagingSenderId: "860294903887",
    appId: "1:860294903887:web:a7cc0240b101acda75923a",
    measurementId: "G-1VG78BJ9RS"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {
    auth,
    provider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
};