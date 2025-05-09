import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { isloading, user, logout } = useContext(AuthContext);

  return (
    <nav className="navigation">
      {!isloading && (
        <>
          <NavLink to={"/"}>Home</NavLink>

          {!user ? (
            <>
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/register"}>Register</NavLink>
            </>
          ) : (
            <>
              <button onClick={() => logout()}>Logout</button>
            </>
          )}
        </>
      )}
    </nav>
  );
}
