
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const [isAuthorised, setIsAuthorised] = useState<boolean | null>(null);

  const refreshToken = useCallback(async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);

    if (!refresh) {
      setIsAuthorised(false);
      return;
    }

    try {
      const response = await api.post("/api/token/refresh/", {
        refresh,
      });

      if (response.status === 200 && response.data.access) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthorised(true);
      } else {
        setIsAuthorised(false);
      }
    } catch {
      setIsAuthorised(false);
    }
  }, []);

  const auth = useCallback(async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setIsAuthorised(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expiration = decoded.exp;
      const now = Date.now() / 1000;

      if (expiration === undefined) {
        setIsAuthorised(false);
      } else if (expiration <= now) {
        await refreshToken();
      } else {
        setIsAuthorised(true);
      }
    } catch {
      setIsAuthorised(false);
    }
  }, [refreshToken]);

  useEffect(() => {
    let cancelled = false;

    Promise.resolve().then(async () => {
      if (cancelled) return;
      await auth();
    });

    return () => {
      cancelled = true;
    };
  }, [auth]);

  if (isAuthorised === null) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  return isAuthorised ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
