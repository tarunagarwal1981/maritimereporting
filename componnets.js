// components.js
const ReportForm = ({ reportType, onSubmit }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <h2>{reportType} Report</h2>
            {/* Add form fields here */}
            <button type="submit">Submit Report</button>
        </form>
    );
};

const Chatbot = ({ messages, onSendMessage }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(input);
        setInput('');
    };

    return (
        <div className="chatbot">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
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
    );
};

const CollapsibleHistoryPanel = ({ reportHistory, setReportHistory }) => {
    return (
        <div className="history-panel">
            <h3>Recent Reports</h3>
            <ul>
                {reportHistory.map((report, index) => (
                    <li key={index}>{report}</li>
                ))}
            </ul>
        </div>
    );
};
