import React, { useEffect, useState } from 'react';

import Confetti from './Confetti';

const ACHIEVEMENTS = {
  'First Quiz': { description: 'Completed your first quiz', icon: '🎯' },
  'Perfect Score': { description: 'Got a perfect score on a quiz', icon: '⭐️' },
  '5 Quiz Streak': { description: 'Completed 5 quizzes in a row', icon: '🔥' },
  '10 Quiz Streak': { description: 'Completed 10 quizzes in a row', icon: '🚀' },
  'Score Master': { description: 'Scored 50 points total', icon: '🏅' },
  'Century Club': { description: 'Scored 100 points total', icon: '💯' }
};

const ScoreCard = ({
  score,
  totalQuestions,
  onRestart,
  currentUser,
  setCurrentUser,
  selectedCategory
}) => {
  const [newAchievements, setNewAchievements] = useState([]);

  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    if (!currentUser) return;

    // Copy arrays to avoid in-place mutation which breaks detection of new achievements
    const previousAchievements = Array.isArray(currentUser.achievements) ? [...currentUser.achievements] : [];
    const updatedUser = { ...currentUser };

    // Update stats
    updatedUser.quizzesCompleted = (updatedUser.quizzesCompleted || 0) + 1;
    updatedUser.totalScore = (updatedUser.totalScore || 0) + score;
    updatedUser.streak = score > 0 ? (updatedUser.streak || 0) + 1 : 0;
    updatedUser.achievements = Array.isArray(updatedUser.achievements) ? [...updatedUser.achievements] : [];

    // Achievement checks (immutable updates)
    const achievementsToCheck = [
      { condition: score === totalQuestions, name: 'Perfect Score' },
      { condition: updatedUser.quizzesCompleted === 1, name: 'First Quiz' },
      { condition: updatedUser.streak >= 5, name: '5 Quiz Streak' },
      { condition: updatedUser.streak >= 10, name: '10 Quiz Streak' },
      { condition: updatedUser.totalScore >= 50, name: 'Score Master' },
      { condition: updatedUser.totalScore >= 100, name: 'Century Club' }
    ];

    achievementsToCheck.forEach(({ condition, name }) => {
      if (condition && !updatedUser.achievements.includes(name)) {
        updatedUser.achievements = [...updatedUser.achievements, name];
      }
    });

    const newlyEarned = updatedUser.achievements.filter(a => !previousAchievements.includes(a));
    setNewAchievements(newlyEarned);
    setCurrentUser(updatedUser);

    // Update leaderboard
    const leaderboardEntry = {
      username: currentUser.username,
      score,
      category: selectedCategory.id,
      date: new Date().toISOString()
    };
    const existingLeaderboard = JSON.parse(localStorage.getItem('quizzyLeaderboard') || '[]');
    localStorage.setItem('quizzyLeaderboard', JSON.stringify([...existingLeaderboard, leaderboardEntry]));
  }, [score, totalQuestions, currentUser, setCurrentUser, selectedCategory]);

  const saveAsGuest = () => {
    if (!guestName.trim()) return;
    const userData = {
      username: guestName.trim(),
      quizzesCompleted: 1,
      totalScore: score,
      bestScores: { [selectedCategory.name]: score },
      achievements: [],
      streak: score > 0 ? 1 : 0,
      joinedDate: new Date().toISOString()
    };
    setCurrentUser(userData);
  };

  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! 🎉", color: "#28a745" };
    if (percentage >= 80) return { message: "Excellent! 👏", color: "#20c997" };
    if (percentage >= 70) return { message: "Great job! 👍", color: "#007bff" };
    if (percentage >= 60) return { message: "Good work! 😊", color: "#ffc107" };
    return { message: "Keep practicing!!!", color: "#dc3545" };
  };

  const { message, color } = getScoreMessage();

  const shareText = `I just scored ${score}/${totalQuestions} on the ${selectedCategory.name} quiz in Quizzy! Can you beat my score?`;

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg score-card card-entrance">
        <div className="card-body text-center p-5">
          <h1 className="display-4 mb-2" style={{ color }}>{message}</h1>
          <h3 className="mb-4 text-secondary">Quiz Complete!</h3>

          <div className="progress mb-4 progress-large position-relative">
            {percentage >= 90 && <Confetti />}
            <div
              className="progress-bar progress-bar-striped progress-bar-animated progress-bar-gradient"
              role="progressbar"
              style={{ width: `${percentage}%` }}
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percentage}%
            </div>
          </div>

          <div className="row mb-4 align-items-center">
            <div className="col-4 text-center">
              <div className="h4 mb-0 text-success">{score}</div>
              <div className="small text-muted">Correct</div>
            </div>
            <div className="col-4 text-center">
              <div className="h4 mb-0 text-primary">{totalQuestions}</div>
              <div className="small text-muted">Total</div>
            </div>
            <div className="col-4 text-center">
              <div className="h4 mb-0" style={{ color }}>{percentage}%</div>
              <div className="small text-muted">Score</div>
            </div>
          </div>

          {newAchievements.length > 0 && (
            <div className="mb-4 achievement-pop">
              <h5 className="text-success mb-3">🎉 New Achievements!</h5>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {newAchievements.map((ach, idx) => {
                  const info = ACHIEVEMENTS[ach] || { description: 'Achievement unlocked', icon: '🏆' };
                  return (
                    <div key={idx} className="text-center">
                      <div className="achievement-icon">{info.icon}</div>
                      <span className="badge bg-success p-2 mb-1">{ach}</span>
                      <div className="small text-muted">{info.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {percentage >= 90 && (
            <div className="mb-3 text-center">
              <div className="medal">🏅 <span className="ms-1">Top Performer</span></div>
            </div>
          )}

          <div className="mb-4">
            <h6 className="mb-3">Share Your Achievement! 📤</h6>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <button className="btn btn-info btn-pill" aria-label="Share score" onClick={() => {
                if (navigator.share) navigator.share({ title: 'Quizzy Score', text: shareText, url: window.location.href });
                else { navigator.clipboard.writeText(shareText + ' ' + window.location.href); alert('Score copied to clipboard!'); }
              }}>📱 Share Score</button>

              <button className="btn btn-primary btn-pill" aria-label="Tweet score" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`, '_blank')}>🐦 Tweet</button>

              <button className="btn btn-success btn-pill" aria-label="Share on Facebook" onClick={() => {
                const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
                window.open(fbUrl, '_blank');
              }}>📘 Facebook</button>
            </div>
          </div>

          {!currentUser && (
            <div className="mb-3">
              <h6 className="mb-2">Save your score</h6>
              <div className="d-flex gap-2 justify-content-center">
                <input type="text" aria-label="Enter a name" className="form-control" placeholder="Enter a name" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                <button className="btn btn-primary btn-pill" aria-label="Save score" onClick={saveAsGuest}>Save</button>
                <button className="btn btn-outline-secondary btn-pill" onClick={() => {
                  const leaderboardEntry = {
                    username: 'Guest',
                    score,
                    category: selectedCategory.id,
                    date: new Date().toISOString()
                  };
                  const existingLeaderboard = JSON.parse(localStorage.getItem('quizzyLeaderboard') || '[]');
                  localStorage.setItem('quizzyLeaderboard', JSON.stringify([...existingLeaderboard, leaderboardEntry]));
                  alert('Saved as Guest');
                }}>Continue as Guest</button>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-outline-primary btn-lg btn-pill start-btn me-2"
              onClick={() => window.dispatchEvent(new Event('showLeaderboard'))}
            >
              View Leaderboard 🏆
            </button>

            <button
              className="btn btn-primary btn-lg btn-pill start-btn"
              onClick={onRestart}
            >
              Take Quiz Again 🔄
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;

