import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const { user, isLoading } = useContext(AuthContext);

  console.log(isLoading)

  console.log(user)

  return (
    <>{!isLoading && <>{user ? <Outlet /> : <Navigate to={"/login"} />}</>}</>
  );
}
