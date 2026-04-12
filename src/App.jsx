import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";

import "./App.css";
import SharedLayout from "./components/common/SharedLayout/SharedLayout.jsx";
import AuthModal from "./components/auth/AuthModal/AuthModal.jsx";
import AdminFloatingButton from "@components/common/AdminFloatingButton/AdminFloatingButton.jsx";

function App({children}) {
  const location = useLocation();
  const isCoursePage = location.pathname.startsWith("/course");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isCoursePage ? (
        <Outlet />
      ) : (
        <SharedLayout>
          <Outlet />
        </SharedLayout>
      )}

        {children}
      <AuthModal />

      <AdminFloatingButton />
    </Suspense>
  )
}

export default App;