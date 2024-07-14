const API_KEY = 'your-api-key-here'; // Replace with your actual API key

function App() {
  const [message, setMessage] = React.useState('');
  const [response, setResponse] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are an AI assistant for a maritime reporting system." },
            { role: "user", content: message }
          ],
          max_tokens: 300,
          temperature: 1.0,
        })
      });
      const data = await result.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setResponse("An error occurred while fetching the response.");
    }
  };

  return React.createElement('div', null, [
    React.createElement('h1', { key: 'title' }, "OptiLog - AI-Enhanced Maritime Reporting System"),
    React.createElement('form', { key: 'form', onSubmit: handleSubmit }, [
      React.createElement('input', {
        key: 'input',
        type: 'text',
        value: message,
        onChange: (e) => setMessage(e.target.value),
        placeholder: "Type your message here"
      }),
      React.createElement('button', { key: 'submit', type: 'submit' }, "Send")
    ]),
    React.createElement('div', { key: 'response' }, response)
  ]);
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
