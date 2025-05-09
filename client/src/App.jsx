import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Protected from "./protected/Protected";
import Events from "./components/Events";
import Authorize from "./protected/Authorize";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />

        <Route path="/" element={<Protected />}>
          <Route path="events" element={<Events />} />
          <Route path="/admin" element={<Authorize role="user" />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
