import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function Authorize({ roles }) {
  const { user } = useContext(AuthContext);

  return <>{roles.includes(user.role) ? <Outlet /> : <Navigate to={"/login"} />}</>;
}
