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

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <p>
        {error.status === 401 && <p>please log in</p>}
        {error.status === 403 && <p>no permission</p>}
        {error.status === 404 && <p>not found</p>}
        {!error.status && <p>{error.message}</p>}
      </p>
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
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <h3>
            {drawer.label} {drawer.is_locked ? "🔒" : "🔓"}
          </h3>

          <p><strong>weight:</strong> {drawer.current_weight}</p>

          <div style={{ marginTop: "10px" }}>
            {drawer.materials.length === 0 ? (
              <p>no materials</p>
            ) : (
              drawer.materials
                .filter((m) => {
                  if (user?.role === "student") {
                    return m.quantity > 0;
                  }
                  return true;
                })
                .map((m, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "10px",
                      marginBottom: "8px",
                      borderRadius: "8px",
                      backgroundColor:
                        m.quantity === 0 && user?.role === "teacher"
                          ? "#ffe5e5"
                          : "#f5f5f5"
                    }}
                  >
                    <strong>{m.material_name}</strong>

                    <p
                      style={{
                        color:
                          m.quantity === 0 && user?.role === "teacher"
                            ? "red"
                            : "black",
                        margin: 0
                      }}
                    >
                      quantity: {m.quantity}
                    </p>
                  </div>
                ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Drawers;