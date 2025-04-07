import React, { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import { Container, Row, Col, Navbar, Nav, Dropdown, Form } from 'react-bootstrap';
import Header from "../components/Header";

const SearchHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );

                setHistory(response.data.searchHistory);
            } catch (error) {
                console.error('Error fetching search history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchHistory();
    }, []);

    if (loading) return <div>Loading search history...</div>;

    return (

        <div className="app-container">

                <div className="chat-window">
                    <Col md={9} className="content">
                        <h2>Your Search History</h2>
                        {history.length === 0 ? (
                            <p>No search history found. Try asking the AI something!</p>
                        ) : (
                            <div className="history-list">
                                {history.map((item) => (
                                    <div key={item._id} className="history-item">
                                        <div className="history-timestamp">
                                            {new Date(item.timestamp).toLocaleString()}
                                        </div>
                                        <div className="history-query">
                                            <strong>You asked:</strong> {item.query}
                                        </div>
                                        <div className="history-response">
                                            <strong>AI response:</strong>
                                            <p>{item.response}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Col>
                </div>
            </div>
    );
};

export default SearchHistory;