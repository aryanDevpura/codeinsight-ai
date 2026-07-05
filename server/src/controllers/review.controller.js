const geminiService = require('../services/gemini.service');

const SUPPORTED_LANGUAGES = ['C++', 'C', 'Java', 'Python'];

async function reviewCode(req, res) {
  try {
    const { language, code } = req.body;

    if (!language || typeof language !== 'string' || !language.trim()) {
      return res.status(400).json({ error: 'Language is required and must be a non-empty string.' });
    }
    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ error: 'Code is required and must be a non-empty string.' });
    }

    if (!SUPPORTED_LANGUAGES.includes(language)) {
      return res.status(400).json({ error: `Language '${language}' is not supported. Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}` });
    }

    const reviewResult = await geminiService.generateReview(language, code);

    return res.status(200).json(reviewResult);
  } catch (error) {
    if (error.name === 'GeminiValidationError') {
      return res.status(502).json({ error: error.message });
    }
    if (error.name === 'GeminiApiError') {
      return res.status(503).json({ error: 'Gemini API is currently unavailable.' });
    }
    console.error('Unexpected error in reviewCode controller:', error.message);
    return res.status(500).json({ error: 'An unexpected server error occurred.' });
  }
}

module.exports = {
  reviewCode
};
