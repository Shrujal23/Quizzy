# Quizzy — Computer Science Quiz App

A modern, polished quiz application built with React. Designed for fast, focused quizzes that are ideal for learning, practice, and showcasing in a frontend portfolio.

---

## What I built

Quizzy is a single-page React application that fetches multiple-choice trivia questions and presents a clean, mobile-friendly quiz experience. Features include a category selector, difficulty levels, lifelines (50/50, skip, hint), scoring & achievements, and a leaderboard stored locally for quick demos.

This project highlights UI/UX attention to detail (typography, micro-interactions, accessible color contrast), component-driven development, and deployment-ready configuration — good material to include on a resume or portfolio.

---

## Demo & Screenshots

- Live demo: (add your deployed URL here)
- Screenshots: add images to `public/screenshots/` and reference them here for the README.

---

## Key Features

- Clean, responsive UI with improved typography and animations
- Multiple categories & difficulty settings
- Real-time question fetching with local fallbacks
- Lifelines and per-question timer
- Scorecard with achievements and social sharing
- Local leaderboard and basic user profile tracking
- Accessibility improvements: keyboard navigation, focus states, ARIA announcements, and a Dark Mode toggle

---

## Tech Stack

- React (functional components + hooks)
- Bootstrap utility classes and custom CSS for polish
- Open Trivia Database (opentdb.com)
- Deployed-ready (Vercel/Netlify friendly)

---

## Running Locally

1. Clone the repo and install:

```bash
git clone <repository-url>
cd quiz
npm install
```

1. Start in development mode:

```bash
npm start
```

1. Build for production:

```bash
npm run build
```

---

## Accessibility & Testing

- ARIA live regions announce results to assistive tech
- Focus-visible styles and keyboard-friendly controls
- (Planned) Unit tests using React Testing Library

---

## Storybook (Component Docs)

This project includes Storybook stories for core components to showcase states and aid UI review.

To get Storybook running locally:

1. Install Storybook (this will add the required dev dependencies):

```bash
npx sb init
```

1. Start Storybook:

```bash
npm run storybook
```

Stories are located in `src/stories/` and include:

- `QuestionCard.stories.js`
- `ScoreCard.stories.js`
- `CategorySelection.stories.js`

---

## Deployment

This repo is ready for deployment on Vercel or Netlify. After connecting your repository, ensure `npm run build` succeeds and set the build output directory to `build/`.

---

## Improvements I made (ideal resume bullets)

- Implemented a consistent design system with CSS variables for colors, spacing, and motion
- Added a professional font (Inter) and refined typographic scale for better hierarchy
- Improved accessibility: color contrast, focus states, ARIA announcements, and keyboard navigation
- Polished key interactions (animated card lift, subtle button transitions, progress/score visuals)

---

## License

MIT — feel free to use or adapt for demos and portfolios.

---

If you'd like, I can add screenshots, a short GitHub Actions workflow for CI, or prepare a one-click deploy setup (Vercel). Which would you like me to do next?
