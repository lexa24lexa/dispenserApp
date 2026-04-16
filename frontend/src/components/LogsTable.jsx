const LogsTable = ({ logs }) => {
  if (!logs.length) return <p>no logs yet</p>;

  return (
    <table border="1">
      <thead>
        <tr>
          <th>id</th>
          <th>user id</th>
          <th>role</th>
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
            <td>{log.user_role}</td>
            <td>{log.drawer_id}</td>
            <td>{log.action}</td>
            <td>{log.weight_before}</td>
            <td>{log.weight_after}</td>
            <td>{new Date(log.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogsTable;