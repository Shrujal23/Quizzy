import React from 'react';
import './Confetti.css';

const Confetti = ({ pieces = 20 }) => {
  const colors = ['#60a5fa', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  const items = Array.from({ length: pieces }).map((_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: Math.random() * 100,
    delay: Math.random() * 0.6
  }));

  return (
    <div className="confetti-root" aria-hidden>
      {items.map(it => (
        <span
          key={it.id}
          className="confetti-piece"
          style={{ left: `${it.left}%`, backgroundColor: it.color, animationDelay: `${it.delay}s` }}
        />
      ))}
    </div>
  );
};

export default Confetti;