console.log('Script started');

const { useState, useEffect, useRef } = React;

const API_KEY = 'your-api-key-here'; // Replace with your actual API key

// ... (keep all the existing functions like getAIResponse, ReportForm, Chatbot)

const App = () => {
    console.log('App component rendered');
    const [reportHistory, setReportHistory] = useState([]);
    const [currentReportType, setCurrentReportType] = useState(null);
    const [messages, setMessages] = useState([]);

    // ... (keep the existing handleSendMessage and handleSubmitReport functions)

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
