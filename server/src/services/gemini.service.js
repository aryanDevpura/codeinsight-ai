const { GoogleGenAI } = require('@google/genai');

if (!process.env.GEMINI_API_KEY) {
  throw new Error("FATAL: GEMINI_API_KEY is not set in the environment.");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

function validateReviewSchema(data) {
  if (!data || typeof data !== 'object') return false;
  if (typeof data.score !== 'number' || data.score < 0 || data.score > 100) return false;
  if (!data.complexity || typeof data.complexity !== 'object') return false;
  if (typeof data.complexity.time !== 'string' || typeof data.complexity.space !== 'string') return false;
  if (!Array.isArray(data.bugs) || !data.bugs.every(b => typeof b === 'string')) return false;
  if (!Array.isArray(data.suggestions) || !data.suggestions.every(s => typeof s === 'string')) return false;
  if (typeof data.review !== 'string') return false;
  if (typeof data.refactoredCode !== 'string') return false;
  return true;
}

async function generateReview(language, code) {
  const prompt = `You are a senior software engineer conducting a code review.
Please review the provided ${language} code.

CRITICAL INSTRUCTIONS:
- Always return valid JSON.
- Never return markdown or code fences (e.g. do NOT wrap in \`\`\`json ... \`\`\`).
- Never omit fields.
- Never return null for any field.
- If the code cannot be analyzed, still return a valid JSON object with sensible defaults (e.g. score 0, empty arrays for bugs/suggestions, standard complexity).

SCORING RUBRIC (Max 100):
- Correctness: 40 points
- Readability: 20 points
- Efficiency: 20 points
- Best Practices: 20 points
Deduct points ONLY for concrete issues. Score consistently for identical code.

Your output must be EXACTLY a valid JSON object matching the following schema. Return ONLY the raw JSON text.

Schema:
{
  "score": number (0-100),
  "complexity": {
    "time": string (e.g., "O(N)"),
    "space": string (e.g., "O(1)")
  },
  "bugs": string[] (Array of bug descriptions),
  "suggestions": string[] (Array of actionable suggestions),
  "review": string (Detailed overall analysis),
  "refactoredCode": string (The complete refactored version of the code)
}

Code to review:
${code}`;

  let response;
  try {
    response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      }
    });
  } catch (error) {
    const apiError = new Error("Gemini API unavailable: " + error.message);
    apiError.name = 'GeminiApiError';
    throw apiError;
  }

  const rawText = response.text;
  
  let result;
  try {
    result = JSON.parse(rawText);
  } catch (parseError) {
    const parseErr = new Error("Failed to parse Gemini response as JSON. Raw text: " + rawText);
    parseErr.name = 'GeminiValidationError';
    throw parseErr;
  }
  
  if (!validateReviewSchema(result)) {
    const schemaErr = new Error("Invalid review schema returned by AI service.");
    schemaErr.name = 'GeminiValidationError';
    throw schemaErr;
  }
  
  return result;
}

module.exports = {
  generateReview,
  validateReviewSchema
};
