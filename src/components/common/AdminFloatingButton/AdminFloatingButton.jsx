import { Link, useLocation } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import {useAuth} from "@/context/AuthContext.jsx";

import cl from "./AdminFloatingButton.module.css";

const AdminFloatingButton = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isAdmin = user?.role === "admin";
  const isAlreadyInAdmin = location.pathname.startsWith("/admin");

  if (!isAdmin || isAlreadyInAdmin) return null;

  return (
    <Link to="/admin" className={cl.floatingBtn} title="Перейти в админку">
      <GrUserAdmin />
      <span className={cl.btnText}>Admin Panel</span>
    </Link>
  );
};

export default AdminFloatingButton;