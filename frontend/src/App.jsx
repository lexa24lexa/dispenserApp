import { useEffect, useState } from "react";

function App() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then(res => res.json())
      .then(data => {
        console.log("backend response:", data);
        setBackendMessage(data.message);
      })
      .catch(err => console.error("fetch error:", err));
  }, []);

  return (
    <div>
      <h1>ola</h1>
      <p>backend response: {backendMessage}</p>
    </div>
  );
}

export default App;