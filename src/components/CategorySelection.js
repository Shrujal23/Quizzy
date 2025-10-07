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

  // Fallback questions for when API fails
  const getFallbackQuestions = (categoryId) => {
    const fallbackQuestions = {
      'computer-science': [
        {
          question: "What does HTML stand for?",
          options: ["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
          correctAnswer: 0
        },
        {
          question: "Which programming language is known as the 'language of the web'?",
          options: ["Python", "JavaScript", "C++", "Java"],
          correctAnswer: 1
        },
        {
          question: "What does CSS stand for?",
          options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
          correctAnswer: 1
        }
      ],
      'general-knowledge': [
        {
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: 2
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: 1
        },
        {
          question: "What is the largest ocean on Earth?",
          options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
          correctAnswer: 3
        }
      ],
      'history': [
        {
          question: "In which year did World War II end?",
          options: ["1944", "1945", "1946", "1947"],
          correctAnswer: 1
        },
        {
          question: "Who was the first President of the United States?",
          options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
          correctAnswer: 2
        }
      ],
      'science-nature': [
        {
          question: "What is the chemical symbol for water?",
          options: ["Wa", "H2O", "Wo", "Hw"],
          correctAnswer: 1
        },
        {
          question: "How many bones are in the adult human body?",
          options: ["206", "208", "210", "212"],
          correctAnswer: 0
        }
      ],
      'sports': [
        {
          question: "How many players are on a basketball team on the court at one time?",
          options: ["4", "5", "6", "7"],
          correctAnswer: 1
        },
        {
          question: "In which sport would you perform a slam dunk?",
          options: ["Tennis", "Basketball", "Volleyball", "Baseball"],
          correctAnswer: 1
        }
      ],
      'geography': [
        {
          question: "What is the longest river in the world?",
          options: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
          correctAnswer: 1
        },
        {
          question: "Which continent is the largest by land area?",
          options: ["Africa", "Asia", "North America", "Europe"],
          correctAnswer: 1
        }
      ]
    };

    return fallbackQuestions[categoryId] || fallbackQuestions['general-knowledge'];
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg" style={{ maxWidth: '900px', width: '100%' }}>
        <div className="card-body p-5">
          <div className="text-center mb-5">
            <h1 className="card-title mb-3" style={{ color: '#2c3e50' }}>
              Quizzy - Choose the Quiz Category
            </h1>
            <p className="card-text" style={{ fontSize: '1.1rem', color: '#6c757d' }}>
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
                  className={`btn ${selectedDifficulty === difficulty ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => onDifficultySelect(difficulty)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {categories.map((category) => (
              <div key={category.id} className="col-12 col-md-6 col-lg-4">
                <div
                  className="card h-100 category-card"
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent'
                  }}
                  onClick={() => onCategorySelect(category)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = category.color;
                    e.currentTarget.style.boxShadow = `0 8px 25px ${category.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className="mb-3"
                      style={{
                        fontSize: '3rem',
                        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
                      }}
                    >
                      {category.icon}
                    </div>
                    <h5 className="card-title mb-2" style={{ color: category.color }}>
                      {category.name}
                    </h5>
                    <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                      {category.description}
                    </p>
                    <button
                      className="btn w-100 mt-3"
                      style={{
                        backgroundColor: category.color,
                        borderColor: category.color,
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      Start Quiz →
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
