import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { api } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    // Слушаем изменение состояния пользователя в Firebase
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Если юзер есть в Firebase, пробуем синхронизировать с БД
          try {
            const backendUser = await api.login();
            setUser({ ...firebaseUser, role: backendUser.role });
          } catch (err) {
            console.error("Бэкенд недоступен, входим без роли:", err);
            setUser(firebaseUser); // Заходим хотя бы как обычный юзер
          }
        } else {
          setUser(null);
        }
      } catch (criticalErr) {
        console.error("Критическая ошибка Auth:", criticalErr);
      } finally {
        // ЭТО ГЛАВНОЕ: загрузка выключится ВСЕГДА
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const hasFullAccess = useMemo(() => user?.role === "admin", [user]);

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
      await signInWithPopup(auth, googleProvider);
      setIsAuthModalOpen(false);
      if (redirectPath) window.location.assign(redirectPath);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      window.location.reload(); // Чистим состояние при выходе
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = useMemo(() => ({
    user,
    hasFullAccess,
    loading,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    signInWithGoogle,
    logOut,
  }), [user, hasFullAccess, loading, isAuthModalOpen]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);