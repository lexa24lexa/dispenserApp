import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", gap: "12px", padding: "10px", borderBottom: "1px solid #ccc" }}>

      <Link to="/">Home</Link>

      {/* teacher */}
      {user?.role === "teacher" && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/drawers">Drawers</Link>
          <Link to="/users">Users</Link>
          <Link to="/replenishment">Replenishment</Link>
        </>
      )}

      {/* student */}
      {user?.role === "student" && (
        <>
          <Link to="/student/dashboard">Dashboard</Link>
          <Link to="/drawers">Drawers</Link>
          <Link to="/request">Request</Link>
        </>
      )}

      {/* right side */}
      <div style={{ marginLeft: "auto", display: "flex", gap: "10px", alignItems: "center" }}>

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <span>
              {user.name} ({user.role})
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

      </div>

    </nav>
  );
};

export default Navbar;