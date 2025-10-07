import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import ScoreCard from './ScoreCard';
import he from 'he';

const QuizContainer = ({ selectedCategory, selectedDifficulty, onBackToCategories, onRestartQuiz, currentUser, setCurrentUser }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    skip: true,
    hint: true
  });
  const [timeBonus, setTimeBonus] = useState(0);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [hintText, setHintText] = useState('');

  // Fetch questions from API or use fallback
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(selectedCategory.apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch questions!!');
        }

        const responseData = await response.json();

        // Handle CORS proxy response format
        let apiData;
        if (responseData.contents) {
          // CORS proxy response format
          apiData = JSON.parse(responseData.contents);
        } else {
          // Direct API response format
          apiData = responseData;
        }

        // Transform API data to match our component structure
        const transformedQuestions = apiData.results.map((item, index) => {
          // Decode HTML entities
          const decodedQuestion = he.decode(item.question);
          const decodedCorrectAnswer = he.decode(item.correct_answer);
          const decodedIncorrectAnswers = item.incorrect_answers.map(answer => he.decode(answer));

          // Combine correct and incorrect answers, then shuffle them
          const allAnswers = [...decodedIncorrectAnswers, decodedCorrectAnswer];
          const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

          // Find the index of the correct answer in the shuffled array
          const correctAnswerIndex = shuffledAnswers.findIndex(answer => answer === decodedCorrectAnswer);

          return {
            id: index + 1,
            question: decodedQuestion,
            options: shuffledAnswers,
            correctAnswer: correctAnswerIndex
          };
        });

        setQuizData(transformedQuestions);
        setLoading(false);
      } catch (err) {
        // Use fallback questions if API fails
        console.log('API failed, using fallback questions:', err.message);
        const fallbackQuestions = getFallbackQuestions(selectedCategory.id);
        setQuizData(fallbackQuestions);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedCategory]);

  // Import fallback questions function
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
        },
        {
          question: "What is the main purpose of JavaScript?",
          options: ["Styling web pages", "Creating web page structure", "Adding interactivity to web pages", "Managing databases"],
          correctAnswer: 2
        },
        {
          question: "Which of these is NOT a programming paradigm?",
          options: ["Object-Oriented", "Functional", "Procedural", "Digital"],
          correctAnswer: 3
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
        },
        {
          question: "Who painted the Mona Lisa?",
          options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
          correctAnswer: 2
        },
        {
          question: "What is the smallest country in the world?",
          options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
          correctAnswer: 2
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
        },
        {
          question: "Which ancient wonder of the world was located in Alexandria?",
          options: ["Hanging Gardens of Babylon", "Statue of Zeus at Olympia", "Lighthouse of Alexandria", "Temple of Artemis"],
          correctAnswer: 2
        },
        {
          question: "In which year did the Berlin Wall fall?",
          options: ["1987", "1988", "1989", "1990"],
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
        },
        {
          question: "What is the largest planet in our solar system?",
          options: ["Earth", "Saturn", "Jupiter", "Uranus"],
          correctAnswer: 2
        },
        {
          question: "What gas do plants absorb from the atmosphere?",
          options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
          correctAnswer: 2
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
        },
        {
          question: "How many points is a touchdown worth in American football?",
          options: ["3", "6", "7", "8"],
          correctAnswer: 1
        },
        {
          question: "Which country has won the most FIFA World Cups?",
          options: ["Germany", "Argentina", "Brazil", "Italy"],
          correctAnswer: 2
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
        },
        {
          question: "What is the capital of Japan?",
          options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
          correctAnswer: 2
        },
        {
          question: "Which mountain range contains Mount Everest?",
          options: ["Andes", "Rocky Mountains", "Alps", "Himalayas"],
          correctAnswer: 3
        }
      ]
    };

    return fallbackQuestions[categoryId] || fallbackQuestions['general-knowledge'];
  };

  // Timer effect
  useEffect(() => {
    let interval = null;

    if (timerActive && timeLeft > 0 && !showResult && !loading && !quizCompleted) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            // Timer reached 0, automatically move to next question
            setTimeout(() => {
              handleNextQuestion();
            }, 100);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, showResult, loading, quizCompleted]);

  // Reset timer when moving to new question
  useEffect(() => {
    if (!loading && !quizCompleted && quizData.length > 0) {
      setTimeLeft(15);
      setTimerActive(true);
    }
  }, [currentQuestionIndex, loading, quizCompleted, quizData.length]);

  const handleAnswerSelect = (answerIndex) => {
    if (showResult || loading) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setTimerActive(false); // Stop the timer when answer is selected

    const currentQuestion = quizData[currentQuestionIndex];
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setHiddenOptions([]);
      setHintText('');
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    onRestartQuiz();
  };

  // Lifeline handlers
  const handleFiftyFifty = () => {
    if (!lifelines.fiftyFifty || showResult) return;

    const currentQuestion = quizData[currentQuestionIndex];
    const incorrectOptions = currentQuestion.options
      .map((option, index) => index)
      .filter(index => index !== currentQuestion.correctAnswer);

    // Randomly select 2 incorrect options to hide
    const shuffledIncorrect = incorrectOptions.sort(() => Math.random() - 0.5);
    const toHide = shuffledIncorrect.slice(0, 2);

    setHiddenOptions(toHide);
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));
  };

  const handleSkip = () => {
    if (!lifelines.skip || showResult) return;

    setLifelines(prev => ({ ...prev, skip: false }));
    handleNextQuestion();
  };

  const handleHint = () => {
    if (!lifelines.hint || showResult) return;

    const currentQuestion = quizData[currentQuestionIndex];
    const correctOption = currentQuestion.options[currentQuestion.correctAnswer];
    const hint = `The answer starts with "${correctOption.charAt(0)}"`;

    setHintText(hint);
    setLifelines(prev => ({ ...prev, hint: false }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="text-muted">Loading {selectedCategory.name} Questions...</h4>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="card-body text-center p-5">
            <h4 className="card-title mb-3 text-danger">Error Loading Questions</h4>
            <p className="card-text mb-4 text-muted">{error}</p>
            <button
              className="btn btn-primary"
              onClick={handleRestart}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No questions loaded
  if (quizData.length === 0) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="card-body text-center p-5">
            <h4 className="card-title mb-3">No Questions Available</h4>
            <p className="card-text mb-4 text-muted">Unable to load quiz questions at this time.</p>
            <button
              className="btn btn-primary"
              onClick={handleRestart}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

  if (quizCompleted) {
    return <ScoreCard score={score} totalQuestions={quizData.length} onRestart={handleRestart} currentUser={currentUser} setCurrentUser={setCurrentUser} selectedCategory={selectedCategory} />;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-outline-secondary"
          onClick={onBackToCategories}
        >
          ← Back to Categories
        </button>
        <div className="text-center">
          <h2 className="mb-0" style={{ color: selectedCategory.color }}>
            {selectedCategory.name} Quiz
          </h2>
          <small className="text-muted">
            Question {currentQuestionIndex + 1} of {quizData.length}
          </small>
        </div>
        <div style={{ width: '100px' }}></div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="progress" style={{ height: '10px' }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-4">
        <div className="d-inline-flex align-items-center justify-content-center"
             style={{
               backgroundColor: timeLeft <= 5 ? '#f8d7da' : '#d1ecf1',
               border: `3px solid ${timeLeft <= 5 ? '#dc3545' : '#17a2b8'}`,
               borderRadius: '50%',
               width: '80px',
               height: '80px',
               fontSize: '1.5rem',
               fontWeight: 'bold',
               color: timeLeft <= 5 ? '#721c24' : '#0c5460',
               transition: 'all 0.3s ease'
             }}>
          {timeLeft}
        </div>
        <p className="mt-2 mb-0" style={{ color: timeLeft <= 5 ? '#dc3545' : '#6c757d' }}>
          {timeLeft <= 5 ? '⏰ Time running out!' : '⏱️ Time remaining'}
        </p>
      </div>

      {/* Lifelines */}
      <div className="text-center mb-4">
        <div className="d-flex justify-content-center gap-3">
          <button
            className={`btn ${lifelines.fiftyFifty ? 'btn-warning' : 'btn-secondary'}`}
            onClick={handleFiftyFifty}
            disabled={!lifelines.fiftyFifty || showResult}
            style={{ minWidth: '100px' }}
          >
            50/50
          </button>
          <button
            className={`btn ${lifelines.skip ? 'btn-info' : 'btn-secondary'}`}
            onClick={handleSkip}
            disabled={!lifelines.skip || showResult}
            style={{ minWidth: '100px' }}
          >
            Skip
          </button>
          <button
            className={`btn ${lifelines.hint ? 'btn-success' : 'btn-secondary'}`}
            onClick={handleHint}
            disabled={!lifelines.hint || showResult}
            style={{ minWidth: '100px' }}
          >
            Hint
          </button>
        </div>
        {hintText && (
          <div className="mt-2 alert alert-info" style={{ display: 'inline-block' }}>
            💡 {hintText}
          </div>
        )}
      </div>

      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        onAnswerSelect={handleAnswerSelect}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        hiddenOptions={hiddenOptions}
      />



      {/* Next Button */}
      <div className="text-center">
        {showResult && (
          <button
            className="btn btn-primary btn-lg px-5 py-3"
            onClick={handleNextQuestion}
            style={{ borderRadius: '50px', fontSize: '1.1rem' }}
          >
            {currentQuestionIndex === quizData.length - 1 ? 'View Results' : 'Next Question'} →
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizContainer;
