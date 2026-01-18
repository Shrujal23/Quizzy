import React from 'react';
import { render, screen } from '@testing-library/react';
import ScoreCard from '../components/ScoreCard';

test('shows score summary and share buttons', () => {
  const mockSetUser = jest.fn();
  const currentUser = { username: 'Tester', achievements: [], quizzesCompleted: 0, totalScore: 0, streak: 0 };
  render(<ScoreCard score={8} totalQuestions={10} onRestart={() => {}} currentUser={currentUser} setCurrentUser={mockSetUser} selectedCategory={{ id: 'cs', name: 'CS' }} />);

  expect(screen.getByText(/Quiz Complete!/i)).toBeInTheDocument();
  expect(screen.getByText(/Share Your Achievement/i)).toBeInTheDocument();
});

test('awards perfect score achievement', async () => {
  const mockSetUser = jest.fn();
  const currentUser = { username: 'Tester', achievements: [], quizzesCompleted: 0, totalScore: 0, streak: 0 };
  render(<ScoreCard score={10} totalQuestions={10} onRestart={() => {}} currentUser={currentUser} setCurrentUser={mockSetUser} selectedCategory={{ id: 'cs', name: 'CS' }} />);

  // Wait for side-effect to update achievements
  expect(await screen.findByText(/New Achievements!/i)).toBeInTheDocument();
  expect(await screen.findByText(/Perfect Score/)).toBeInTheDocument();
});
