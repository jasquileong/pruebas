import React, { useEffect, useState } from 'react';
import './app.css';

export default function App() {
  const [company, setCompany] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am your travel assistant. Ask me for tips on your next trip.',
    },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/info')
      .then((res) => res.json())
      .then(setCompany)
      .catch(() =>
        setCompany({ name: 'Automaite', tagline: 'AI-driven automation' })
      );
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([ ...newMessages, { role: 'assistant', content: data.reply } ]);
    } catch (err) {
      setMessages([ ...newMessages, { role: 'assistant', content: 'Error contacting AI service.' } ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="app">
      <header className="hero">
        <img src="/logo.png" alt="Automaite logo" className="logo" />
        <h1>Automaite</h1>
        <p>Elevate your business with cutting-edge AI.</p>
      </header>
      {company && (
        <section className="info">
          <h2>{company.name}</h2>
          <p>{company.tagline}</p>
        </section>
      )}

      <section className="chat">
        {messages.map((m, idx) => (
          <div key={idx} className={`message ${m.role}`}>
            {m.content}
          </div>
        ))}
        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask for travel tips..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </section>
    </div>
  );
}
