import { useState } from "react";
import { apiRequest } from "../api/api";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await apiRequest("/login", "POST", { name, password });

      login(data);

      if (data.role === "teacher") {
        navigate("/");
      } else {
        navigate("/");
      }

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">login</button>
    </form>
  );
};

export default Login;