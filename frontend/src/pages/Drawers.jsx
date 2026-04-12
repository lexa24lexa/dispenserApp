import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import { useAuth } from "../auth/useAuth";

const Drawers = () => {
  const { user } = useAuth();

  const [drawers, setDrawers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrawers = async () => {
      try {
        const data = await apiRequest("/drawers");
        setDrawers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrawers();
  }, []);

  if (loading) return <p>loading...</p>;

  if (error) {
    return (
      <div>
        <p>
          {error.status === 401 && "please login"}
          {error.status === 403 && "no permission"}
          {error.status === 404 && "not found"}
          {!error.status && error.message}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Drawers</h2>

      {drawers.map((drawer) => (
        <div
          key={drawer.drawer_id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "15px",
            marginBottom: "20px"
          }}
        >
          <h3>
            {drawer.label} {drawer.is_locked ? "🔒" : "🔓"}
          </h3>

          {user?.role === "teacher" && (
            <p>
              <strong>calculated weight:</strong>{" "}
              {drawer.calculated_weight}
            </p>
          )}

          <div style={{ marginTop: "10px" }}>
            {drawer.materials
              .filter((m) => {
                if (user?.role === "student") {
                  return m.quantity > 0;
                }
                return true;
              })
              .map((m) => (
                <div
                  key={m.material_id}
                  style={{
                    padding: "10px",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    backgroundColor:
                      m.quantity === 0 && user?.role === "teacher"
                        ? "#ffcccc"
                        : "#f5f5f5"
                  }}
                >
                  <strong>{m.name}</strong>

                  <p style={{ margin: 0 }}>
                    quantity: {m.quantity}
                  </p>

                  {user?.role === "teacher" && (
                    <p style={{ margin: 0 }}>
                      weight: {m.total_weight}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Drawers;