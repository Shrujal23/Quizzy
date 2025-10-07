import React from 'react';

const StartScreen = ({ onStartQuiz }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body text-center p-5">
          <h1 className="card-title mb-4" style={{ color: '#2c3e50' }}>
            💻 Computer Science Quiz
          </h1>
          <p className="card-text mb-4" style={{ fontSize: '1.1rem', color: '#6c757d' }}>
            Challenge yourself with 10 medium-difficulty computer science questions!
            Test your programming knowledge and see how you rank.
          </p>
          <div className="mb-4">
            <h5 className="text-muted">Quiz Features:</h5>
            <ul className="list-unstyled">
              <li>✅ 10 Computer Science Questions</li>
              <li>✅ Medium Difficulty Level</li>
              <li>✅ Real-time API Questions</li>
              <li>✅ Instant Feedback</li>
              <li>✅ Score Tracking</li>
              <li>✅ Responsive Design</li>
            </ul>
          </div>
          <button
            className="btn btn-primary btn-lg px-5 py-3"
            onClick={onStartQuiz}
            style={{ fontSize: '1.2rem', borderRadius: '50px' }}
          >
            Start Quiz 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
