const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const OPENAI_API_KEY = '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';

app.use(express.json());

app.post('/generate-text', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${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}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
