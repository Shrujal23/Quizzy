import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionCard from '../components/QuestionCard';

const sampleQuestion = {
  question: 'What runs in a web browser?',
  options: ['Java', 'C', 'Python', 'JavaScript'],
  correctAnswer: 3,
  index: 1
};

test('renders question and options', () => {
  const mockSelect = jest.fn();
  render(<QuestionCard question={sampleQuestion} onAnswerSelect={mockSelect} selectedAnswer={null} showResult={false} />);

  expect(screen.getByText(/What runs in a web browser/i)).toBeInTheDocument();
  expect(screen.getByText(/JavaScript/)).toBeInTheDocument();
});

test('calls onAnswerSelect when option clicked', () => {
  const mockSelect = jest.fn();
  render(<QuestionCard question={sampleQuestion} onAnswerSelect={mockSelect} selectedAnswer={null} showResult={false} />);

  const optionButton = screen.getByTitle('Select option D');
  fireEvent.click(optionButton);
  expect(mockSelect).toHaveBeenCalledWith(3);
});

test('disables options when showResult is true', () => {
  const mockSelect = jest.fn();
  render(<QuestionCard question={sampleQuestion} onAnswerSelect={mockSelect} selectedAnswer={3} showResult={true} />);

  const optionButton = screen.getByTitle('Select option D');
  expect(optionButton).toBeDisabled();
});
