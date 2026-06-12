import { Navigate } from "react-router-dom";

// Einfacher Auth-Guard: ohne Token geht es zum Login. Die eigentliche
// Token-Validierung übernimmt das Backend (401 bei abgelaufenem Token).
export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
