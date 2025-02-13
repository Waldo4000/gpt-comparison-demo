// pages/api/generateDefault.js
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
      model: 'gpt-3.5-turbo', // Change to "gpt-4" if you have access
      messages: [
        {
          role: 'system',
          content:
            'You are representing the inspire mes segment, a group of females between 25 and 35 years of age, interested in nice things, jewellery and fashion.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const result = response.data.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error(
      'Error in generateDefault:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Error generating response' });
  }
}
