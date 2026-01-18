import React from 'react';

const QuestionCard = ({ question, onAnswerSelect, selectedAnswer, showResult, hiddenOptions = [] }) => {
  const getButtonClass = (optionIndex) => {
    if (!showResult) {
      return selectedAnswer === optionIndex ? 'answer-btn btn selected' : 'answer-btn btn';
    }

    if (optionIndex === question.correctAnswer) {
      return 'answer-btn btn correct';
    }

    if (optionIndex === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'answer-btn btn incorrect';
    }

    return 'answer-btn btn';
  };

  // Keyboard navigation: track a local focused index
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const optionCount = question.options.length;

  // Status region for accessible results
  const statusRef = React.useRef(null);
  React.useEffect(() => {
    if (showResult && statusRef.current) {
      statusRef.current.focus();
    }
  }, [showResult]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setFocusedIndex((i) => (i + 1) % optionCount);
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setFocusedIndex((i) => (i - 1 + optionCount) % optionCount);
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (focusedIndex >= 0 && !showResult && !hiddenOptions.includes(focusedIndex)) {
        onAnswerSelect(focusedIndex);
      }
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="question-bubble">
            <h4 className="card-title mb-0 question-title">{question.question}</h4>
          </div>
          <div className="progress-pill">
            <span className="small">{question.index ? `Q${question.index}` : ''}</span>
          </div>
        </div>

        <div className="options-row" role="list" tabIndex={0} onKeyDown={onKeyDown}>
          {question.options.map((option, index) => {
            const isHidden = hiddenOptions.includes(index);
            const focused = index === focusedIndex;
            return (
              <div key={index} role="listitem" className={`option-wrapper m-2 ${isHidden ? 'hidden-option' : ''}`} aria-hidden={isHidden}>
                <button
                  className={`${getButtonClass(index)} option-reveal`}
                  onClick={() => !showResult && !isHidden && onAnswerSelect(index)}
                  disabled={showResult || isHidden}
                  aria-pressed={selectedAnswer === index}
                  aria-disabled={showResult || isHidden}
                  aria-label={isHidden ? 'Option hidden' : `Option ${String.fromCharCode(65 + index)}. ${option}`}
                  title={isHidden ? 'Option hidden' : `Select option ${String.fromCharCode(65 + index)}`}
                  ref={(el) => {
                    if (el && focused) el.focus();
                  }}
                >
                  <span className="me-2 fw-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              </div>
            );
          })}
        </div>

        <div
          className="status-message mt-3"
          role="status"
          aria-live="polite"
          tabIndex={-1}
          ref={statusRef}
        >
          {showResult && (
            selectedAnswer === question.correctAnswer ? (
              <div className="text-success">Correct! 🎉</div>
            ) : (
              <div className="text-danger">Incorrect — correct answer: {question.options[question.correctAnswer]}</div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

