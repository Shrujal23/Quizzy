import React from 'react';

const StartScreen = ({ onStartQuiz }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg start-card card-entrance">
        <div className="card-body text-center p-5">
          <h1 className="card-title start-title mb-4">
            💻 Computer Science Quiz
          </h1>
          <p className="card-text start-subtext mb-4">
            Challenge yourself with 10 medium-difficulty computer science questions!
            Test your programming knowledge and see how you rank.
          </p>
          <div className="mb-4">
            <h5 className="text-muted">Quiz Features:</h5>
            <div className="row gx-3">
              <div className="col-12 col-md-6">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2" />
                    10 Computer Science Questions
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2" />
                    Medium Difficulty Level
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2" />
                    Real-time API Questions
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-6">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2" />
                    Instant Feedback
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2" />
                    Score Tracking
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2" />
                    Responsive Design
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-primary btn-lg btn-pill start-btn px-5 py-3"
              onClick={onStartQuiz}
              aria-label="Start quiz"
            >
              Start Quiz 🚀
            </button>

            <button
              className="btn btn-outline-primary btn-lg btn-pill start-btn px-4 py-3"
              onClick={() => window.dispatchEvent(new Event('showLeaderboard'))}
              aria-label="View leaderboard"
            >
              🏆 Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;

