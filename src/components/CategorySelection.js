import React from 'react';

const CategorySelection = ({ onCategorySelect, selectedDifficulty, onDifficultySelect }) => {
  const categories = [
    {
      id: 'general-knowledge',
      name: 'General Knowledge',
      description: 'Challenge yourself with various topics',
      icon: '🧠',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple'),
      color: '#2563eb'
    },
    {
      id: 'computer-science',
      name: 'Computer Science',
      description: 'Test your programming and technical knowledge',
      icon: '💻',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'),
      color: '#06b6d4'
    },
    {
      id: 'science-nature',
      name: 'Science & Nature',
      description: 'Discover the wonders of science',
      icon: '🔬',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple'),
      color: '#10b981'
    },
    {
      id: 'history',
      name: 'History',
      description: 'Explore historical events and figures',
      icon: '📜',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple'),
      color: '#f59e0b'
    },
    {
      id: 'geography',
      name: 'Geography',
      description: 'Explore countries and landmarks',
      icon: '🌍',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple'),
      color: '#8b5cf6'
    },
    {
      id: 'sports',
      name: 'Sports',
      description: 'Test your sports knowledge',
      icon: '⚽',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple'),
      color: '#ef4444'
    },
    {
      id: 'entertainment-movies',
      name: 'Movies',
      description: 'Test your movie knowledge',
      icon: '🎬',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple'),
      color: '#ec4899'
    },
    {
      id: 'entertainment-music',
      name: 'Music',
      description: 'Challenge your musical knowledge',
      icon: '🎵',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple'),
      color: '#84cc16'
    },
    {
      id: 'entertainment-books',
      name: 'Books & Literature',
      description: 'Explore literary works and authors',
      icon: '📚',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple'),
      color: '#f97316'
    },
    {
      id: 'mythology',
      name: 'Mythology',
      description: 'Dive into myths and legends',
      icon: '🏛️',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple'),
      color: '#6366f1'
    },
    {
      id: 'politics',
      name: 'Politics',
      description: 'Test your political knowledge',
      icon: '🏛️',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=24&difficulty=medium&type=multiple'),
      color: '#64748b'
    },
    {
      id: 'art',
      name: 'Art',
      description: 'Explore art and artists',
      icon: '🎨',
      apiUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://opentdb.com/api.php?amount=10&category=25&difficulty=medium&type=multiple'),
      color: '#eab308'
    }
  ];

  // Legacy: fallback questions were previously provided here. We now fetch live data and keep a small in-app fallback elsewhere if needed.

  // helper to pick readable foreground based on hex color brightness
  const isColorLight = (hex) => {
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq > 180;
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg card-max-900">
        <div className="card-body p-5">
          <div className="text-center mb-5">
            <h1 className="card-title mb-3 start-title">
              Quizzy - Choose the Quiz Category
            </h1>
            <p className="card-text start-subtext">
              Select a category to start your quiz challenge!
            </p>
          </div>

          {/* Difficulty Selector */}
          <div className="text-center mb-4">
            <h5 className="mb-3">Select Difficulty Level</h5>
            <div className="btn-group" role="group">
              {['easy', 'medium', 'hard'].map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  className={`btn btn-cap ${selectedDifficulty === difficulty ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => onDifficultySelect(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {categories.map((category) => {
              const fg = isColorLight(category.color) ? '#111827' : '#ffffff';
              return (
                <div key={category.id} className="col-12 col-md-6 col-lg-4">
                  <div
                    className="card h-100 category-card"
                    style={{ '--card-color': category.color, '--card-foreground': fg }}
                    role="button"
                    tabIndex={0}
                    onClick={() => onCategorySelect(category)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onCategorySelect(category); }}
                    aria-label={`Start ${category.name} quiz`}
                  >
                    <div className="card-body text-center p-4">
                      <div className="mb-3 category-icon">
                        {category.icon}
                      </div>
                      <h5 className="card-title mb-2 category-title" style={{ color: 'var(--card-color)' }}>
                        {category.name}
                      </h5>
                      <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                        {category.description}
                      </p>
                      <button
                        className="btn w-100 mt-3 category-start-btn"
                        style={{ '--card-color': category.color, '--card-foreground': fg }}
                      >
                        Start Quiz →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-4">
            <small className="text-muted">
              Questions provided by <a href="https://opentdb.com/" target="_blank" rel="noopener noreferrer">Open Trivia Database</a>
              <br />
              <em>Note: Some categories may have limited questions per difficulty level</em>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;


