const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event, context) {
  // Log the request method and body for debugging
  console.log('Request method:', event.httpMethod);
  console.log('Request body:', event.body);

  if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    let messages;
    if (event.httpMethod === 'POST') {
      messages = JSON.parse(event.body).messages;
    } else {
      // For GET requests, use a default message
      messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello" }
      ];
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAIAPIKEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 150
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error in openai-proxy:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to query OpenAI API', details: error.message })
    };
  }
};
