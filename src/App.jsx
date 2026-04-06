import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";

import "./App.css";
import SharedLayout from "./components/common/SharedLayout/SharedLayout.jsx";
import AuthModal from "./components/auth/AuthModal/AuthModal.jsx";
import OnboardingModal from "./pages/Course/components/onboarding/OnboardingModal/OnboardingModal";
import { useAuth } from "./context/AuthContext.jsx";

const ONBOARDING_STORAGE_KEY = "tasty-python-onboarding-seen";

function App() {
  const location = useLocation();
  const isCoursePage = location.pathname.startsWith("/course");
  const { isAuthModalOpen } = useAuth();

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    const handleOpenOnboarding = () => {
      setIsOnboardingOpen(true);
    };

    window.addEventListener("open-onboarding", handleOpenOnboarding);

    return () => {
      window.removeEventListener("open-onboarding", handleOpenOnboarding);
    };
  }, []);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem(ONBOARDING_STORAGE_KEY) === "true";

    if (location.pathname === "/" && !hasSeenOnboarding && !isAuthModalOpen) {
      setIsOnboardingOpen(true);
    }
  }, [location.pathname, isAuthModalOpen]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isCoursePage ? (
        <Outlet />
      ) : (
        <SharedLayout>
          <Outlet />
        </SharedLayout>
      )}

      <AuthModal />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </Suspense>
  );
}

export default App;