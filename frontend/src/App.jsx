import React, { useEffect, useState } from 'react';
import './app.css';

export default function App() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/info')
      .then((res) => res.json())
      .then(setCompany)
      .catch(() =>
        setCompany({ name: 'Automaite', tagline: 'AI-driven automation' })
      );
  }, []);

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
    </div>
  );
}
