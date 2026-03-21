import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFjtUfhlPOYpw1uuznIZIvWXEBz0-l-jM",
  authDomain: "woolf-graduate-proj.firebaseapp.com",
  projectId: "woolf-graduate-proj",
  storageBucket: "woolf-graduate-proj.firebasestorage.app",
  messagingSenderId: "972798635132",
  appId: "1:972798635132:web:a3ec19a5f4a49debc7edf9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;