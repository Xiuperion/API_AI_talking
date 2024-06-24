const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey: 'YOUR_OPENAI_API_KEY',
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: userMessage },
            ],
        });

        const aiResponse = completion.data.choices[0].message.content;
        res.json({ response: aiResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
