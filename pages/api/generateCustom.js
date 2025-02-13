// pages/api/generateCustom.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // or "gpt-4" if available
      messages: [
        {
          role: 'system',
          content:
            'You are a custom GPT with a synthetic persona built from proprietary panel data. Your responses should exude sophistication, charm, and an expert understanding of luxury, fashion, and jewelry trends. Engage the user in a unique, personable manner that goes beyond generic answers.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const result = response.data.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error(
      'Error in generateCustom:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Error generating response' });
  }
}
