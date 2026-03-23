import { useEffect, useState } from "react";

const STORAGE_KEY = "tasty-python-pro-access";

const useProAccess = () => {
  const [hasProAccess, setHasProAccess] = useState(false);

  useEffect(() => {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    setHasProAccess(savedValue === "true");
  }, []);

  const grantProAccess = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setHasProAccess(true);
  };

  const revokeProAccess = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasProAccess(false);
  };

  return {
    hasProAccess,
    grantProAccess,
    revokeProAccess,
  };
};

export default useProAccess;