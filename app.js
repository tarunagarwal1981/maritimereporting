import React, { useState, useEffect, useRef } from 'react';
import { ReportForm } from './ReportForm';
import { Chatbot } from './Chatbot';

const App = () => {
    const [reportHistory, setReportHistory] = useState([]);
    const [currentReportType, setCurrentReportType] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (message) => {
        const updatedMessages = [...messages, { role: 'user', content: message }];
        setMessages(updatedMessages);
        
        try {
            const aiResponse = await getAIResponse(message, reportHistory);
            setMessages([...updatedMessages, { role: 'assistant', content: aiResponse }]);
            
            const reportTypeMatch = aiResponse.match(/create a (.*?) report/i);
            if (reportTypeMatch) {
                setCurrentReportType(reportTypeMatch[1]);
            }
        } catch (error) {
            console.error('Error getting AI response:', error);
            setMessages([...updatedMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
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

export default App;
