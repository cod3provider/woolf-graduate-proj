import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";

import "./App.css";
import SharedLayout from "./components/common/SharedLayout/SharedLayout.jsx";

function App() {
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
    </Suspense>
  );
}

export default App;