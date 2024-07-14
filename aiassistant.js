// aiAssistant.js
const API_KEY = 'your-api-key-here'; // Replace with your actual API key

const getAIResponse = async (userInput, lastReports) => {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are an AI assistant for a maritime reporting system..." },
                    { role: "user", content: userInput }
                ],
                max_tokens: 300,
                temperature: 1.0,
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return "I'm sorry, but I encountered an error. Please try again later.";
    }
};
