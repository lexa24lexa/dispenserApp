import { useEffect, useState } from "react";

function App() {
  const [backendMessage, setBackendMessage] = useState("");
  const [logs, setLogs] = useState([]);

  // fetch test message
  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then(res => res.json())
      .then(data => {
        console.log("backend response:", data);
        setBackendMessage(data.message);
      })
      .catch(err => console.error("fetch error:", err));
  }, []);

  // fetch logs
  useEffect(() => {
    fetch("http://localhost:5000/api/logs")
      .then(res => res.json())
      .then(data => {
        console.log("logs registered:", data);
        setLogs(data); // store the logs array
      })
      .catch(err => console.error("fetch error:", err));
  }, []);

  return (
    <div>
      <h1>ola</h1>
      <p>backend response: {backendMessage}</p>
      <br></br>
      <h2>dashboard</h2>
      {logs.length === 0 ? (
        <p>no logs yet</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>id</th>
              <th>user id</th>
              <th>drawer id</th>
              <th>action</th>
              <th>weight before</th>
              <th>weight after</th>
              <th>timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.user_id}</td>
                <td>{log.drawer_id}</td>
                <td>{log.action}</td>
                <td>{log.weight_before}</td>
                <td>{log.weight_after}</td>
                <td>{new Date(log.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;