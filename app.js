console.log('Script started');

const { useState, useEffect, useRef } = React;

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

const ReportForm = ({ reportType, onSubmit }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <h2>{reportType} Report</h2>
            {/* Add form fields here */}
            <input type="text" placeholder="Vessel Name" />
            <input type="text" placeholder="IMO Number" />
            {/* Add more fields as needed */}
            <button type="submit">Submit Report</button>
        </form>
    );
};

const Chatbot = ({ messages, onSendMessage }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="chatbot-section">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

const App = () => {
    console.log('App component rendered');
    const [reportHistory, setReportHistory] = useState([]);
    const [currentReportType, setCurrentReportType] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (message) => {
        const updatedMessages = [...messages, { role: 'user', content: message }];
        setMessages(updatedMessages);

        const aiResponse = await getAIResponse(message, reportHistory);
        setMessages([...updatedMessages, { role: 'assistant', content: aiResponse }]);

        // Check if AI suggests a report type
        const reportTypeMatch = aiResponse.match(/create a (.*?) report/i);
        if (reportTypeMatch) {
            setCurrentReportType(reportTypeMatch[1]);
        }
    };

    const handleSubmitReport = () => {
        console.log('Report submitted:', currentReportType);
        setReportHistory([...reportHistory, currentReportType]);
        setCurrentReportType(null);
    };

    return (
        <div className="app-container">
            <div className="form-section">
                <h1>OptiLog - AI-Enhanced Maritime Reporting System</h1>
                {currentReportType ? (
                    <ReportForm reportType={currentReportType} onSubmit={handleSubmitReport} />
                ) : (
                    <p>Please use the AI Assistant to initiate a report.</p>
                )}
            </div>
            <Chatbot messages={messages} onSendMessage={handleSendMessage} />
        </div>
    );
};

console.log('About to render App component');
try {
    ReactDOM.render(<App />, document.getElementById('root'));
    console.log('App rendered successfully');
} catch (error) {
    console.error('Error rendering App:', error);
}
