import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import { useAuth } from "../auth/useAuth";

const Drawers = () => {
  const { user } = useAuth();

  const [drawers, setDrawers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [showEmptyOnly, setShowEmptyOnly] = useState(false);
  const [selectedDrawer, setSelectedDrawer] = useState("all");

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

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="search material..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <select
          value={selectedDrawer}
          onChange={(e) => setSelectedDrawer(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="all">all drawers</option>

          {drawers.map((d) => (
            <option key={d.drawer_id} value={d.drawer_id}>
              {d.label}
            </option>
          ))}
        </select>

        {user?.role === "teacher" && (
          <label>
            <input
              type="checkbox"
              checked={showEmptyOnly}
              onChange={(e) => setShowEmptyOnly(e.target.checked)}
            />
            show empty only
          </label>
        )}
      </div>

      {drawers
        .filter((drawer) => {
          if (selectedDrawer !== "all") {
            return drawer.drawer_id === Number(selectedDrawer);
          }
          return true;
        })
        .map((drawer) => {

          const sortedMaterials = [...drawer.materials]
            .filter((m) => {
              // student rule
              if (user?.role === "student" && m.quantity <= 0) {
                return false;
              }

              // teacher: empty-only filter
              if (user?.role === "teacher" && showEmptyOnly) {
                return m.quantity === 0;
              }

              // search filter
              if (search) {
                return m.name.toLowerCase().includes(search.toLowerCase());
              }

              return true;
            })
            .sort((a, b) => a.quantity - b.quantity);

          return (
            <div
              key={drawer.drawer_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "15px",
                marginBottom: "20px",
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
                {sortedMaterials.length === 0 ? (
                  <p>no materials</p>
                ) : (
                  sortedMaterials.map((m) => (
                    <div
                      key={m.material_id}
                      style={{
                        padding: "10px",
                        marginBottom: "8px",
                        borderRadius: "8px",
                        backgroundColor:
                          m.quantity === 0 && user?.role === "teacher"
                            ? "#ffcccc"
                            : "#f5f5f5",
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
                  ))
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Drawers;