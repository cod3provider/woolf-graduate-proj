import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";

import "./App.css";
import SharedLayout from "./components/common/SharedLayout/SharedLayout.jsx";
import AuthModal from "./components/auth/AuthModal/AuthModal.jsx";

function App() {
  const location = useLocation();
  const isCoursePage = location.pathname.startsWith("/course");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {
        <SharedLayout>
          <Outlet />
        </SharedLayout>
      }

      <AuthModal />
    </Suspense>
  );
}

export default App;