import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:5000') // Changed to 5000
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => setMessage('Error: ' + error.message));
  }, []);

  return (
    <div>
      <h1>Message from API:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;