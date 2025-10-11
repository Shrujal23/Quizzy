import React, { useEffect, useState } from 'react';

const ACHIEVEMENTS = {
  'First Quiz': { description: 'Completed your first quiz', icon: '🎯' },
  'Perfect Score': { description: 'Got a perfect score on a quiz', icon: '⭐' },
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

  useEffect(() => {
    if (!currentUser) return;

    const previousAchievements = currentUser.achievements || [];
    const updatedUser = { ...currentUser };
    
    // Update stats
    updatedUser.quizzesCompleted = (updatedUser.quizzesCompleted || 0) + 1;
    updatedUser.totalScore = (updatedUser.totalScore || 0) + score;
    updatedUser.streak = score > 0 ? (updatedUser.streak || 0) + 1 : 0;
    if (!updatedUser.achievements) updatedUser.achievements = [];

    // Achievement checks
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
        updatedUser.achievements.push(name);
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
      <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%', borderRadius: '15px' }}>
        <div className="card-body text-center p-5">
          <h1 className="display-4 mb-2" style={{ color }}>{message}</h1>
          <h3 className="mb-4 text-secondary">Quiz Complete!</h3>

          <div className="progress mb-4" style={{ height: '30px', borderRadius: '15px' }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: `${percentage}%`, backgroundColor: color, fontWeight: 'bold', fontSize: '1.1rem' }}
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percentage}%
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-6">
              <h4 className="text-success">{score}</h4>
              <p className="text-muted">Correct Answers</p>
            </div>
            <div className="col-6">
              <h4 className="text-primary">{totalQuestions}</h4>
              <p className="text-muted">Total Questions</p>
            </div>
          </div>

          {newAchievements.length > 0 && (
            <div className="mb-4">
              <h5 className="text-success mb-3">🎉 New Achievements!</h5>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {newAchievements.map((ach, idx) => {
                  const info = ACHIEVEMENTS[ach] || { description: 'Achievement unlocked', icon: '🏆' };
                  return (
                    <div key={idx} className="text-center">
                      <div style={{ fontSize: '2rem' }}>{info.icon}</div>
                      <span className="badge bg-success p-2 mb-1">{ach}</span>
                      <div className="small text-muted">{info.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h6 className="mb-3">Share Your Achievement! 📤</h6>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <button className="btn btn-info" onClick={() => {
                if (navigator.share) navigator.share({ title: 'Quizzy Score', text: shareText, url: window.location.href });
                else { navigator.clipboard.writeText(shareText + ' ' + window.location.href); alert('Score copied to clipboard!'); }
              }}>📱 Share Score</button>

              <button className="btn btn-primary" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`, '_blank')}>🐦 Tweet</button>

              <button className="btn btn-success" onClick={() => {
                const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
                window.open(fbUrl, '_blank');
              }}>📘 Facebook</button>
            </div>
          </div>

          <button
            className="btn btn-primary btn-lg px-5 py-3"
            onClick={onRestart}
            style={{ fontSize: '1.1rem', borderRadius: '50px' }}
          >
            Take Quiz Again 🔄
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
