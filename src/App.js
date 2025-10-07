import React, { useState, useEffect } from 'react';
import './App.css';
import CategorySelection from './components/CategorySelection';
import QuizContainer from './components/QuizContainerNew';
import UserProfile from './components/UserProfile';
import Leaderboard from './components/Leaderboard';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('quizzyUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage when currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('quizzyUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('quizzyUser');
    }
  }, [currentUser]);

  const handleUserLogin = (userData) => {
    setCurrentUser(userData);
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleBackToMain = () => {
    setShowProfile(false);
    setShowLeaderboard(false);
    setQuizStarted(false);
    setSelectedCategory(null);
  };

  const handleShowLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const handleCategorySelect = (category) => {
    // Update category API URL with selected difficulty and add cache-busting parameter
    const baseUrl = category.apiUrl.replace('difficulty=medium', `difficulty=${selectedDifficulty}`);
    const cacheBuster = `&t=${Date.now()}`;
    const updatedCategory = {
      ...category,
      apiUrl: baseUrl + cacheBuster
    };
    setSelectedCategory(updatedCategory);
    setQuizStarted(true);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleBackToCategories = () => {
    setQuizStarted(false);
    setSelectedCategory(null);
  };

  const handleRestartQuiz = () => {
    
    // Keep the same category but restart the quiz
    setQuizStarted(false);
    setTimeout(() => {
      setQuizStarted(true);
    }, 100);
  };

  return (
    <div className="App">
      {!currentUser && (
        <UserProfile onLogin={handleUserLogin} />
      )}

      {currentUser && !quizStarted && !showProfile && !showLeaderboard && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <button className="btn btn-link" onClick={handleShowProfile}>
                Welcome, {currentUser.username} (Profile)
              </button>
            </div>
            <div>
              <button className="btn btn-outline-primary me-2" onClick={handleShowLeaderboard}>
                🏆 Leaderboard
              </button>
              <button className="btn btn-link text-danger" onClick={handleUserLogout}>
                Logout
              </button>
            </div>
          </div>
          <CategorySelection
            onCategorySelect={handleCategorySelect}
            selectedDifficulty={selectedDifficulty}
            onDifficultySelect={handleDifficultySelect}
          />
        </div>
      )}

      {showProfile && (
        <UserProfile
          user={currentUser}
          onLogin={handleUserLogin}
          onBack={handleBackToMain}
          onLogout={handleUserLogout}
        />
      )}

      {showLeaderboard && (
        <Leaderboard onBack={handleBackToMain} />
      )}

      {quizStarted && (
        <QuizContainer
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          onBackToCategories={handleBackToCategories}
          onRestartQuiz={handleRestartQuiz}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
}

export default App;
