import cl from "./AuthModal.module.css";
import { useAuth } from "../../../context/AuthContext";

const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    signInWithGoogle,
    loading,
  } = useAuth();

  if (!isAuthModalOpen) return null;

  return (
    <div className={cl.backdrop} onClick={closeAuthModal}>
      <div className={cl.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={cl.closeBtn}
          onClick={closeAuthModal}
          aria-label="Close modal"
        >
          ×
        </button>

        <p className={cl.badge}>Welcome</p>
        <h2 className={cl.title}>Create your personal account</h2>
        <p className={cl.text}>
          Sign in with Google to save your progress and access your personal space.
        </p>

        <button
          type="button"
          className={cl.googleBtn}
          onClick={signInWithGoogle}
          disabled={loading}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AuthModal;