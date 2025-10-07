import React from 'react';

const QuestionCard = ({ question, onAnswerSelect, selectedAnswer, showResult, hiddenOptions = [] }) => {
  const getButtonClass = (optionIndex) => {
    if (!showResult) {
      return selectedAnswer === optionIndex
        ? 'btn btn-outline-primary'
        : 'btn btn-outline-secondary';
    }

    if (optionIndex === question.correctAnswer) {
      return 'btn btn-success';
    }

    if (optionIndex === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'btn btn-danger';
    }

    return 'btn btn-outline-secondary';
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body p-4">
        <h4 className="card-title mb-4" style={{ color: '#2c3e50' }}>
          {question.question}
        </h4>

        <div className="row g-3">
          {question.options.map((option, index) => {
            const isHidden = hiddenOptions.includes(index);
            return (
              <div key={index} className="col-12 col-md-6" style={{ display: isHidden ? 'none' : 'block' }}>
                <button
                  className={`w-100 p-3 ${getButtonClass(index)}`}
                  onClick={() => !showResult && !isHidden && onAnswerSelect(index)}
                  disabled={showResult || isHidden}
                  style={{
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span className="me-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
