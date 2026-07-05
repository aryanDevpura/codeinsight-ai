# CodeInsight AI

**CodeInsight AI** is an AI-powered code review tool that leverages Google Gemini to provide instant, intelligent feedback on your code. It evaluates code quality, detects bugs, estimates time and space complexity, suggests improvements, and generates refactored code—all in one place.

---

## Features

- AI Code Review — Powered by Google Gemini 2.5 Flash
- Quality Scoring — Fixed rubric: Correctness (40), Readability (20), Efficiency (20), Best Practices (20)
- Complexity Analysis — Time and space complexity estimation
- Bug Detection — Identifies potential bugs and issues
- Suggestions — Actionable improvement recommendations
- Code Refactoring — AI-generated refactored version of the submitted code
- Multi-language Support — Supports C++, C, Java, and Python
- Monaco Editor — VS Code-grade editing experience
- Modern UI — Clean interface following the standard LeetCode color scheme
- Responsive Design — Optimized for desktop and mobile devices

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React, Vite, Tailwind CSS v4 |
| Editor | Monaco Editor |
| Backend | Node.js, Express |
| AI | Google Gemini API (`@google/genai`) |

---

## Architecture Overview

```text
Client (React + Vite)
  │
  ├── User writes code in Monaco Editor
  ├── Selects language (C++, C, Java, Python)
  ├── Clicks "Review Code"
  │
  └── POST /api/review ───► Express Server
                                │
                                ├── Validates request
                                ├── Sends prompt to Gemini API
                                ├── Parses and validates JSON response
                                └── Returns structured review
```

---

## Folder Structure

```text
codeinsight-ai/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ReviewCard.jsx
│   │   │   └── ScoreCard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── review.controller.js
│   │   ├── routes/
│   │   │   └── review.routes.js
│   │   └── services/
│   │       └── gemini.service.js
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
└── README.md
```

---

## Installation

### Prerequisites

- Node.js v18 or later
- npm v9 or later
- A Google Gemini API key

---

### Clone the Repository

```bash
git clone https://github.com/your-username/codeinsight-ai.git
cd codeinsight-ai
```

---

### Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

---

## Environment Variables

### `server/.env`

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

> **Note:** `VITE_API_URL` must include the `/api` prefix.

---

## Running Locally

### Start the Backend

```bash
cd server
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

### Start the Frontend

```bash
cd client
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## API Endpoint

### POST `/api/review`

### Request

```json
{
  "language": "Python",
  "code": "def hello():\n    print('Hello')"
}
```

### Successful Response

```json
{
  "score": 85,
  "complexity": {
    "time": "O(1)",
    "space": "O(1)"
  },
  "bugs": [],
  "suggestions": [
    "Add a docstring to the function"
  ],
  "review": "The code is clean and simple...",
  "refactoredCode": "def hello() -> None:\n    \"\"\"Print a greeting.\"\"\"\n    print('Hello')"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Invalid request (missing fields) |
| 500 | Unexpected server error |
| 502 | Invalid JSON/schema returned by Gemini |
| 503 | Gemini API unavailable |

---

## Deployment

### Backend (Render)

1. Create a new **Web Service**.
2. Set the **Root Directory** to `server`.
3. Build Command:

```bash
npm install
```

4. Start Command:

```bash
npm start
```

5. Add the following environment variables:

```text
GEMINI_API_KEY=your_api_key
PORT=5000
```

---

### Frontend (Vercel)

1. Import the GitHub repository.
2. Set the **Root Directory** to `client`.
3. Choose **Vite** as the Framework Preset.
4. Add the environment variable:

```text
VITE_API_URL=https://your-backend.onrender.com/api
```

5. Deploy.

---

## Screenshots

### Home Page

> Add a screenshot here.

### Review Results

> Add a screenshot here.

---

## Future Improvements

- GitHub repository review
- File upload support
- PDF export of reviews
- Light/Dark theme toggle
- Multiple AI model support
- Side-by-side code diff view
- Code review history
- Clipboard copy buttons

---

## License

This project is licensed under the MIT License.
