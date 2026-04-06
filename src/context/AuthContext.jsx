import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

const AuthContext = createContext(null);

const ACCESS_STORAGE_KEY = "tasty-python-course-access";

const readAccessMap = () => {
  try {
    const raw = localStorage.getItem(ACCESS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeAccessMap = (value) => {
  localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(value));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hasFullAccess, setHasFullAccess] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.uid) {
        const accessMap = readAccessMap();
        setHasFullAccess(Boolean(accessMap[currentUser.uid]));
      } else {
        setHasFullAccess(false);
      }

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

  const grantCourseAccess = () => {
    if (!user?.uid) return;

    const accessMap = readAccessMap();
    accessMap[user.uid] = true;
    writeAccessMap(accessMap);
    setHasFullAccess(true);
  };

  const revokeCourseAccess = () => {
    if (!user?.uid) return;

    const accessMap = readAccessMap();
    delete accessMap[user.uid];
    writeAccessMap(accessMap);
    setHasFullAccess(false);
  };

  const value = useMemo(
    () => ({
      user,
      hasFullAccess,
      loading,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      signInWithGoogle,
      logOut,
      grantCourseAccess,
      revokeCourseAccess,
    }),
    [user, hasFullAccess, loading, isAuthModalOpen]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);