import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function Authorize({ role }) {
  const { user } = useContext(AuthContext);

  return <>{user?.role === role ? <Outlet /> : <Navigate to={"/login"} />}</>;
}
