import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import LogsTable from "../components/LogsTable";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await apiRequest("/logs");
        setLogs(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div>
        <h2>Dashboard</h2>
        {error.status === 401 && <p>please login</p>}
        {error.status === 403 && <p>no permission</p>}
        {error.status === 404 && <p>not found</p>}
        {!error.status && <p>{error.message}</p>}
      </div>
    );
  }

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <LogsTable logs={logs} />
    </div>
  );
};

export default Dashboard;