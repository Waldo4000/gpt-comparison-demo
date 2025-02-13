// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [defaultResponse, setDefaultResponse] = useState('');
  const [customResponse, setCustomResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setDefaultResponse('');
    setCustomResponse('');

    try {
      // Call default ChatGPT API endpoint
      const resDefault = await fetch('/api/generateDefault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const dataDefault = await resDefault.json();
      setDefaultResponse(dataDefault.result);

      // Call custom GPT API endpoint
      const resCustom = await fetch('/api/generateCustom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const dataCustom = await resCustom.json();
      setCustomResponse(dataCustom.result);
    } catch (error) {
      console.error('Error fetching responses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>GPT Comparison Demo</h1>
        <p>
          Enter a prompt below to see side-by-side responses from Default ChatGPT and
          your Custom GPT.
        </p>
      </header>

      <main className="main">
        <form onSubmit={handleSubmit} className="prompt-form">
          <textarea
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="prompt-input"
            rows="4"
          ></textarea>
          <button type="submit" className="submit-button">
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>

        <div className="results">
          <div className="result-card">
            <h2>Default ChatGPT</h2>
            <div className="result-content">
              {defaultResponse ? defaultResponse : <p>No response yet.</p>}
            </div>
          </div>

          <div className="result-card">
            <h2>Custom GPT</h2>
            <div className="result-content">
              {customResponse ? customResponse : <p>No response yet.</p>}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Demo powered by OpenAI API</p>
      </footer>
    </div>
  );
}
