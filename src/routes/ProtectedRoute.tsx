import { useSelector } from "react-redux";
import type { UserRole } from "../types/dataTypes";
import type { State } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";

interface RoutesRolePropes {
  allowedRoles: UserRole[];
}

const RoleProtectedRoute: React.FC<RoutesRolePropes> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state: State) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!user?.role || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
