console.log('Script started');

const { useState, useEffect, useRef } = React;

const API_KEY = 'your-api-key-here'; // Replace with your actual API key

const getAIResponse = async (userInput, lastReports) => {
    // ... (keep the existing implementation)
};

// Define ReportForm component
const ReportForm = ({ reportType, onSubmit }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <h2>{reportType} Report</h2>
            <input type="text" placeholder="Vessel Name" />
            <input type="text" placeholder="IMO Number" />
            <button type="submit">Submit Report</button>
        </form>
    );
};

// Define Chatbot component
const Chatbot = ({ messages, onSendMessage }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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

// Define App component
const App = () => {
    const [reportHistory, setReportHistory] = useState([]);
    const [currentReportType, setCurrentReportType] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (message) => {
        const updatedMessages = [...messages, { role: 'user', content: message }];
        setMessages(updatedMessages);

        const aiResponse = await getAIResponse(message, reportHistory);
        setMessages([...updatedMessages, { role: 'assistant', content: aiResponse }]);

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
    ReactDOM.render(React.createElement(App), document.getElementById('root'));
    console.log('App rendered successfully');
} catch (error) {
    console.error('Error rendering App:', error);
}
