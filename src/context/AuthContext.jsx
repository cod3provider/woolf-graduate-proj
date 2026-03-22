import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const openAuthModal = (path = null) => {
  setRedirectPath(typeof path === "string" ? path : null);
  setIsAuthModalOpen(true);
};

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setRedirectPath(null);
  };

  const signInWithGoogle = async () => {
  try {
    const targetPath =
      typeof redirectPath === "string" && redirectPath.startsWith("/")
        ? redirectPath
        : null;

    await signInWithPopup(auth, googleProvider);

    setIsAuthModalOpen(false);
    setRedirectPath(null);

    if (targetPath) {
      window.location.assign(targetPath);
    }
  } catch (error) {
    console.error("Google sign-in error:", error);
  }
};

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      signInWithGoogle,
      logOut,
    }),
    [user, loading, isAuthModalOpen]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);