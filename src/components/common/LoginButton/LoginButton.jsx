import cl from "./LoginButton.module.css";
import { useAuth } from "../../../context/AuthContext";

const LoginButton = () => {
  const { openAuthModal } = useAuth();

  return (
    <button
      type="button"
      className={cl.loginBtn}
      onClick={openAuthModal}
    >
      Login
    </button>
  );
};

export default LoginButton;