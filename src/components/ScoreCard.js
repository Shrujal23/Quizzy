import React, { useEffect, useState } from 'react';

const ScoreCard = ({ score, totalQuestions, onRestart, currentUser, setCurrentUser, selectedCategory }) => {
  const [newAchievements, setNewAchievements] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const previousAchievements = currentUser.achievements || [];

      // Update user stats on quiz completion
      const updatedUser = { ...currentUser };
      updatedUser.quizzesCompleted = (updatedUser.quizzesCompleted || 0) + 1;
      updatedUser.totalScore = (updatedUser.totalScore || 0) + score;

      // Update streak (simple logic: increment if score > 0, else reset)
      if (score > 0) {
        updatedUser.streak = (updatedUser.streak || 0) + 1;
      } else {
        updatedUser.streak = 0;
      }

      // Check and add achievements
      if (!updatedUser.achievements) updatedUser.achievements = [];

      // Perfect Score
      if (score === totalQuestions && !updatedUser.achievements.includes('Perfect Score')) {
        updatedUser.achievements.push('Perfect Score');
      }

      // First Quiz
      if (updatedUser.quizzesCompleted === 1 && !updatedUser.achievements.includes('First Quiz')) {
        updatedUser.achievements.push('First Quiz');
      }

      // Streak achievements
      if (updatedUser.streak >= 5 && !updatedUser.achievements.includes('5 Quiz Streak')) {
        updatedUser.achievements.push('5 Quiz Streak');
      }
      if (updatedUser.streak >= 10 && !updatedUser.achievements.includes('10 Quiz Streak')) {
        updatedUser.achievements.push('10 Quiz Streak');
      }

      // Total score achievements
      if (updatedUser.totalScore >= 50 && !updatedUser.achievements.includes('Score Master')) {
        updatedUser.achievements.push('Score Master');
      }
      if (updatedUser.totalScore >= 100 && !updatedUser.achievements.includes('Century Club')) {
        updatedUser.achievements.push('Century Club');
      }

      // Find newly earned achievements
      const newlyEarned = updatedUser.achievements.filter(achievement => !previousAchievements.includes(achievement));
      setNewAchievements(newlyEarned);

      setCurrentUser(updatedUser);

      // Add score to leaderboard
      const leaderboardEntry = {
        username: currentUser.username,
        score: score,
        category: selectedCategory.id,
        date: new Date().toISOString()
      };

      const existingLeaderboard = JSON.parse(localStorage.getItem('quizzyLeaderboard') || '[]');
      existingLeaderboard.push(leaderboardEntry);
      localStorage.setItem('quizzyLeaderboard', JSON.stringify(existingLeaderboard));
    }
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

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body text-center p-5">
          <div className="mb-4">
            <h1 className="display-4 mb-3" style={{ color }}>
              {message}
            </h1>
            <h2 className="mb-3" style={{ color: '#2c3e50' }}>
              Quiz Complete!
            </h2>
          </div>

          <div className="mb-4">
            <div className="progress mb-3" style={{ height: '30px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: color,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {percentage}%
              </div>
            </div>
          </div>

          <div className="row text-center mb-4">
            <div className="col-6">
              <h3 className="text-success">{score}</h3>
              <p className="text-muted">Correct Answers</p>
            </div>
            <div className="col-6">
              <h3 className="text-primary">{totalQuestions}</h3>
              <p className="text-muted">Total Questions</p>
            </div>
          </div>

          {newAchievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-success mb-3">🎉 New Achievements!</h4>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {newAchievements.map((achievement, index) => {
                  const achievementInfo = {
                    'First Quiz': { description: 'Completed your first quiz', icon: '🎯' },
                    'Perfect Score': { description: 'Got a perfect score on a quiz', icon: '⭐' },
                    '5 Quiz Streak': { description: 'Completed 5 quizzes in a row', icon: '🔥' },
                    '10 Quiz Streak': { description: 'Completed 10 quizzes in a row', icon: '🚀' },
                    'Score Master': { description: 'Scored 50 points total', icon: '🏅' },
                    'Century Club': { description: 'Scored 100 points total', icon: '💯' }
                  }[achievement] || { description: 'Achievement unlocked', icon: '🏆' };

                  return (
                    <div key={index} className="text-center">
                      <div className="mb-1" style={{ fontSize: '2rem' }}>
                        {achievementInfo.icon}
                      </div>
                      <div className="badge bg-success p-2 mb-1">
                        {achievement}
                      </div>
                      <div className="small text-muted">
                        {achievementInfo.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h5 className="mb-3">Share Your Achievement! 📤</h5>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <button
                className="btn btn-info"
                onClick={() => {
                  const text = `I just scored ${score}/${totalQuestions} on the ${selectedCategory.name} quiz in Quizzy! Can you beat my score?`;
                  if (navigator.share) {
                    navigator.share({
                      title: 'Quizzy Score',
                      text: text,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(text + ' ' + window.location.href);
                    alert('Score copied to clipboard!');
                  }
                }}
              >
                📱 Share Score
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const tweetText = `I just scored ${score}/${totalQuestions} on the ${selectedCategory.name} quiz in Quizzy! Can you beat my score? ${window.location.href}`;
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
                }}
              >
                🐦 Tweet
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=I just scored ${score}/${totalQuestions} on the ${selectedCategory.name} quiz in Quizzy! Can you beat my score?`;
                  window.open(fbUrl, '_blank');
                }}
              >
                📘 Facebook
              </button>
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
