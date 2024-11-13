// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [insertStatus, setInsertStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConnectionStatus('Connecting to database...');
    setInsertStatus('');
    setResult(null);
    setError('');

    try {
      const response = await fetch('/api/factorial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: parseInt(number) }),
      });
      const data = await response.json();

      if (response.ok) {
        setResult(data.factorial);
        setConnectionStatus(data.connectionStatus);
        setInsertStatus(data.insertStatus);
      } else {
        setError(`Error: ${data.message}`);
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Factorial Calculator with Database Connection Status</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Enter a number:
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="input"
          />
        </label>
        <button type="submit" className="button">Calculate Factorial</button>
      </form>
      {connectionStatus && <p className="status">{connectionStatus}</p>}
      {insertStatus && <p className="status">{insertStatus}</p>}
      {result !== null && <p className="result">Factorial: {result}</p>}
      {error && <p className="error">{error}</p>}

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          font-family: Arial, sans-serif;
          color: #333;
          text-align: center;
        }
        h1 {
          color: #333;
          font-size: 2em;
          margin-bottom: 1em;
        }
        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .input {
          padding: 10px;
          margin: 0.5em 0;
          font-size: 1em;
          width: 100%;
          max-width: 200px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .button {
          padding: 10px 20px;
          font-size: 1em;
          color: #fff;
          background-color: #0070f3;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #005bb5;
        }
        .status {
          color: #28a745;
          font-weight: bold;
          margin-top: 1em;
        }
        .result {
          color: #0070f3;
          font-size: 1.2em;
          font-weight: bold;
        }
        .error {
          color: #dc3545;
          font-weight: bold;
          margin-top: 1em;
        }
      `}</style>
    </div>
  );
}
