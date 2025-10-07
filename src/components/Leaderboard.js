import React, { useState, useEffect } from 'react';

const Leaderboard = ({ onBack }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Load leaderboard data from localStorage
    const savedScores = localStorage.getItem('quizzyLeaderboard');
    if (savedScores) {
      setLeaderboardData(JSON.parse(savedScores));
    }
  }, []);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'computer-science', name: 'Computer Science' },
    { id: 'general-knowledge', name: 'General Knowledge' },
    { id: 'history', name: 'History' },
    { id: 'science-nature', name: 'Science & Nature' },
    { id: 'sports', name: 'Sports' },
    { id: 'geography', name: 'Geography' }
  ];

  const filteredData = selectedCategory === 'all'
    ? leaderboardData
    : leaderboardData.filter(entry => entry.category === selectedCategory);

  const sortedData = filteredData
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Top 10

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary" onClick={onBack}>
          ← Back to Categories
        </button>
        <h2 className="mb-0">🏆 Leaderboard</h2>
        <div style={{ width: '100px' }}></div>
      </div>

      <div className="mb-4">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {sortedData.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">No scores yet!</h4>
          <p className="text-muted">Be the first to set a record.</p>
        </div>
      ) : (
        <div className="row g-3">
          {sortedData.map((entry, index) => (
            <div key={`${entry.username}-${entry.date}-${index}`} className="col-12">
              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className={`badge ${index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-danger' : 'bg-light text-dark'} me-3 fs-5`}>
                      #{index + 1}
                    </div>
                    <div>
                      <h6 className="mb-0">{entry.username}</h6>
                      <small className="text-muted">{entry.category}</small>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="h5 mb-0 text-primary">{entry.score}</div>
                    <small className="text-muted">
                      {new Date(entry.date).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <small className="text-muted">
          Scores are stored locally and reset when clearing browser data.
        </small>
      </div>
    </div>
  );
};

export default Leaderboard;
