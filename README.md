# Quizzy

A modern, interactive quiz application built with React that allows users to test their knowledge across various categories.

## Features

- **Multiple Categories**: Choose from Computer Science, General Knowledge, History, Science & Nature, Sports, and Geography
- **Dynamic Questions**: Fetches real-time questions from the Open Trivia Database API
- **Fallback System**: Includes local fallback questions if the API is unavailable
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Scoring System**: Tracks correct answers and displays final scores
- **Restart Functionality**: Ability to restart the quiz or change categories

## Technologies Used

- React 19
- Bootstrap (for styling)
- Open Trivia Database API
- HTML Entity Decoder (he library)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quiz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. Select a quiz category from the available options
2. Answer the multiple-choice questions
3. View your score at the end of the quiz
4. Choose to restart the quiz or select a different category

## API

This app uses the [Open Trivia Database](https://opentdb.com/) API to fetch quiz questions. The API provides a wide range of trivia questions across different categories and difficulty levels.

## Project Structure

```
quiz/
├── public/
├── src/
│   ├── components/
│   │   ├── CategorySelection.js
│   │   ├── QuestionCard.js
│   │   ├── QuizContainerNew.js
│   │   ├── ScoreCard.js
│   │   └── StartScreen.js
│   ├── data/
│   │   └── quizData.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
