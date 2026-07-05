# CodeInsight AI

**AI-powered code review tool** that leverages Google Gemini to provide instant, intelligent feedback on your code. Get quality scores, bug detection, optimization suggestions, complexity analysis, and refactored code — all in one click.

---

## Features

- **AI Code Review** — Powered by Google Gemini 2.5 Flash
- **Quality Scoring** — Fixed rubric: Correctness (40), Readability (20), Efficiency (20), Best Practices (20)
- **Complexity Analysis** — Time and space complexity estimation
- **Bug Detection** — Identifies potential bugs and issues
- **Suggestions** — Actionable improvement recommendations
- **Code Refactoring** — AI-generated refactored version of your code
- **Multi-language** — Supports C++, C, Java, and Python
- **Monaco Editor** — VS Code-grade editing experience
- **Dark Theme** — Premium dark UI with modern aesthetics
- **Responsive** — Works on desktop and mobile

---

## Tech Stack

| Layer     | Technology                     |
| --------- | ------------------------------ |
| Frontend  | React, Vite, Tailwind CSS v4  |
| Editor    | Monaco Editor                  |
| Backend   | Node.js, Express               |
| AI        | Google Gemini API (`@google/genai`) |

---

## Architecture Overview

```
Client (React + Vite)
  │
  ├── User writes code in Monaco Editor
  ├── Selects language (C++, C, Java, Python)
  ├── Clicks "Review Code"
  │
  └── POST /api/review  ──►  Express Server
                                  │
                                  ├── Validates request
                                  ├── Sends prompt to Gemini API
                                  ├── Parses and validates JSON response
                                  └── Returns structured review
```

---

## Folder Structure

```
codeinsight-ai/
├── client/                     # Frontend
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
├── server/                     # Backend
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

- Node.js v18+
- npm v9+
- A Google Gemini API key ([Get one here](https://aistudio.google.com/apikey))

### Clone the repository

```bash
git clone https://github.com/your-username/codeinsight-ai.git
cd codeinsight-ai
```

### Install dependencies

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

### Start the backend

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`.

### Start the frontend

```bash
cd client
npm run dev
```

The app will open at `http://localhost:5173`.

---

## API Endpoint

### `POST /api/review`

**Request Body:**

```json
{
  "language": "Python",
  "code": "def hello():\n  print('Hello')"
}
```

**Response (200 OK):**

```json
{
  "score": 85,
  "complexity": {
    "time": "O(1)",
    "space": "O(1)"
  },
  "bugs": [],
  "suggestions": ["Add a docstring to the function"],
  "review": "The code is clean and simple...",
  "refactoredCode": "def hello() -> None:\n    \"\"\"Print a greeting.\"\"\"\n    print('Hello')"
}
```

**Error Responses:**

| Status | Description                      |
| ------ | -------------------------------- |
| 400    | Invalid request (missing fields) |
| 502    | Invalid JSON/schema from Gemini  |
| 503    | Gemini API unavailable           |
| 500    | Unexpected server error          |

---

## Deployment

### Backend — Render

1. Create a new **Web Service** on [Render](https://render.com).
2. Set the **Root Directory** to `server`.
3. Set the **Build Command** to `npm install`.
4. Set the **Start Command** to `npm start`.
5. Add environment variables:
   - `GEMINI_API_KEY` = your API key
   - `PORT` = 5000

### Frontend — Vercel

1. Import your repository on [Vercel](https://vercel.com).
2. Set the **Root Directory** to `client`.
3. Set the **Framework Preset** to `Vite`.
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy.

---

## Screenshots

> *Screenshots will be added here.*

---

## Future Improvements

- 📂 GitHub repository review
- 📁 File upload support
- 📄 PDF export of reviews
- 🌗 Light/dark theme toggle
- 🤖 Multiple AI model support
- ↔️ Side-by-side code diff view
- 🕐 Code review history
- 📋 Clipboard copy buttons

---

## License

MIT
