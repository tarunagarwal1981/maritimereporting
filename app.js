// app.js
const { useState, useEffect } = React;

const App = () => {
    const [reportHistory, setReportHistory] = useState([]);
    const [currentReportType, setCurrentReportType] = useState(null);
    const [messages, setMessages] = useState([]);

    const createForm = (reportType) => {
        // Implement form creation logic here
        return <ReportForm reportType={reportType} onSubmit={handleSubmitReport} />;
    };

    const createChatbot = (lastReports) => {
        return (
            <Chatbot 
                messages={messages} 
                onSendMessage={(message) => {
                    setMessages([...messages, { role: 'user', content: message }]);
                    // Call AI assistant here and update messages with response
                }} 
            />
        );
    };

    const handleSubmitReport = () => {
        // Implement report submission logic here
        console.log('Report submitted');
        setReportHistory([...reportHistory, currentReportType]);
        setCurrentReportType(null);
    };

    return (
        <div className="app-container">
            <h1>OptiLog - AI-Enhanced Maritime Reporting System</h1>
            <div className="main-content">
                <div className="report-section">
                    {currentReportType ? (
                        createForm(currentReportType)
                    ) : (
                        <p>Please use the AI Assistant to initiate a report.</p>
                    )}
                </div>
                <div className="chat-section">
                    <CollapsibleHistoryPanel 
                        reportHistory={reportHistory} 
                        setReportHistory={setReportHistory} 
                    />
                    {createChatbot(reportHistory)}
                    <button onClick={() => {
                        setMessages([]);
                        setCurrentReportType(null);
                        setReportHistory([]);
                    }}>Clear Chat</button>
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
