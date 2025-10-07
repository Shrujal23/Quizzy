import React, { useState } from 'react';

const achievementsData = {
  'First Quiz': { description: 'Completed your first quiz', icon: '🎯' },
  'Perfect Score': { description: 'Got a perfect score on a quiz', icon: '⭐' },
  '5 Quiz Streak': { description: 'Completed 5 quizzes in a row', icon: '🔥' },
  '10 Quiz Streak': { description: 'Completed 10 quizzes in a row', icon: '🚀' },
  'Score Master': { description: 'Scored 50 points total', icon: '🏅' },
  'Century Club': { description: 'Scored 100 points total', icon: '💯' }
};

const UserProfile = ({ user, onLogin, onLogout, onBack }) => {
  const [username, setUsername] = useState(user ? user.username : '');
  const [editing, setEditing] = useState(!user);

  const handleLogin = () => {
    if (username.trim()) {
      const userData = {
        username: username.trim(),
        quizzesCompleted: user ? user.quizzesCompleted : 0,
        totalScore: user ? user.totalScore : 0,
        bestScores: user ? user.bestScores : {},
        achievements: user ? user.achievements : [],
        streak: user ? user.streak : 0,
        joinedDate: user ? user.joinedDate : new Date().toISOString()
      };
      onLogin(userData);
    }
  };

  const handleSave = () => {
    if (username.trim()) {
      const updatedUser = { ...user, username: username.trim() };
      onLogin(updatedUser);
      setEditing(false);
    }
  };

  if (!user) {
    // Login/Register screen
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <h2 className="card-title">Welcome to Quizzy</h2>
              <p className="text-muted">Enter your username to start</p>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleLogin}
              disabled={!username.trim()}
            >
              Start Quizzy
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Profile view
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary" onClick={onBack}>
          ← Back to Categories
        </button>
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="card shadow-lg">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2>User Profile</h2>
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            {editing ? (
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button className="btn btn-success ms-2" onClick={handleSave}>
                  Save
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <span className="h5">{user.username}</span>
                <button className="btn btn-outline-primary btn-sm" onClick={() => setEditing(true)}>
                  Edit
                </button>
              </div>
            )}
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <h4 className="card-title text-primary">{user.quizzesCompleted || 0}</h4>
                  <p className="card-text">Quizzes Completed</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <h4 className="card-title text-success">{user.totalScore || 0}</h4>
                  <p className="card-text">Total Score</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <h4 className="card-title text-warning">{user.streak || 0}</h4>
                  <p className="card-text">Current Streak</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <h4 className="card-title text-info">{user.achievements ? user.achievements.length : 0}</h4>
                  <p className="card-text">Achievements</p>
                </div>
              </div>
            </div>
          </div>

          {user.achievements && user.achievements.length > 0 && (
            <div className="mt-4">
              <h5>Achievements</h5>
              <div className="row g-3">
                {user.achievements.map((achievement, index) => {
                  const achievementInfo = achievementsData[achievement] || { description: 'Achievement unlocked', icon: '🏆' };
                  return (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="card h-100 border-success">
                        <div className="card-body text-center">
                          <div className="mb-2" style={{ fontSize: '2rem' }}>
                            {achievementInfo.icon}
                          </div>
                          <h6 className="card-title">{achievement}</h6>
                          <p className="card-text small text-muted">{achievementInfo.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {user.bestScores && Object.keys(user.bestScores).length > 0 && (
            <div className="mt-4">
              <h5>Best Scores by Category</h5>
              <div className="row g-2">
                {Object.entries(user.bestScores).map(([category, score]) => (
                  <div key={category} className="col-md-6">
                    <div className="card">
                      <div className="card-body p-3">
                        <small className="text-muted">{category}</small>
                        <div className="h6 mb-0">{score}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
