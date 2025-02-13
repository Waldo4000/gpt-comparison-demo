// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [defaultResponse, setDefaultResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setDefaultResponse('');

    try {
      // Call the default ChatGPT API endpoint with your master prompt
      const res = await fetch('/api/generateDefault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setDefaultResponse(data.result);
    } catch (error) {
      console.error('Error fetching default GPT response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>GPT Comparison Demo</h1>
        <p>
          Enter a prompt below to compare responses between Default ChatGPT and your Custom GPT.
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
          {/* Default ChatGPT Response */}
          <div className="result-card">
            <h2>Default ChatGPT</h2>
            <div className="result-content">
              {defaultResponse ? defaultResponse : <p>No response yet.</p>}
            </div>
          </div>

          {/* Embedded Custom GPT via iframe */}
          <div className="result-card">
            <h2>Custom GPT</h2>
            <iframe
              src="https://chatgpt.com/gpts/editor/g-y09ESAWXM"
              title="Custom GPT"
              style={{
                width: '100%',
                height: '400px',
                border: 'none',
                borderRadius: '8px',
              }}
            ></iframe>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Demo powered by OpenAI API</p>
      </footer>
    </div>
  );
}
