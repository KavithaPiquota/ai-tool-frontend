import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../styles/History.css";

const SearchHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedSession, setExpandedSession] = useState(null);

    useEffect(() => {
        const fetchSearchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/search-history`,
                    { headers: { Authorization: token } }
                );

                setHistory(groupByDate(response.data.searchHistory));
            } catch (error) {
                console.error('Error fetching search history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchHistory();
    }, []);

    // Group chats by date
    const groupByDate = (data) => {
        return data.reduce((acc, item) => {
            const date = new Date(item.timestamp).toLocaleDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
            return acc;
        }, {});
    };

    const toggleSession = (sessionKey) => {
        setExpandedSession(prev => (prev === sessionKey ? null : sessionKey));
    };

    if (loading) return <div className="loading">Loading chat history...</div>;

    return (
        <div className="history-container">
            <h2 className="main-title">CHAT HISTORY</h2>

            <div className="session-wrapper">
                {Object.entries(history).map(([date, items]) => (
                    <div key={date} className="session">
                        <div className="session-heading" onClick={() => toggleSession(date)}>
                            {date}
                            <span className={`arrow ${expandedSession === date ? 'up' : 'down'}`}></span>
                        </div>
                        {expandedSession === date && (
                            <div className="session-content">
                                {items.map(item => (
                                    <div key={item._id} className="chat-block">
                                        <div className="question">
                                            <strong>You:</strong> {item.query}
                                        </div>
                                        <div className="answer">
                                            <strong>AI:</strong> {item.response}
                                        </div>
                                        <div className="timestamp">
                                            {new Date(item.timestamp).toLocaleTimeString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchHistory;
