import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Form, InputGroup, Dropdown,Spinner,Alert } from 'react-bootstrap';
import { Home, BarChart, PieChart, Settings, Briefcase, Activity, CheckCircle, LogOut, Send } from 'lucide-react';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const username = "Padmanaban S";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data/questions.json');  // Fetch from public folder
        if (!response.ok) throw new Error('Failed to load JSON');

        const data = await response.json();
        setQuestionsData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading JSON:', err);
        setError('Failed to load questions. Please try again.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedQuestion = question.trim().toLowerCase();
    const foundQuestion = questionsData.find((q) =>
      q.question.toLowerCase().trim() === trimmedQuestion
    );

    if (foundQuestion) {
      setAnswer(foundQuestion.answer);
    } else {
      setAnswer('No answer found for this question.');
    }

    setQuestion('');
  };

  return (
    <div className="dashboard-container">

      {/* Navbar */}
      <Navbar expand="lg" className="p-2 sticky-top modern-navbar">
        <Container fluid>
          <Navbar.Brand href="#home" className="fw-bold logo-text">
            <span className="text-gradient">AI Tool</span>
          </Navbar.Brand>
          <div className="d-flex align-items-center order-lg-last">
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-user" className="nav-profile-toggle">
                <div className="avatar-circle">{username.toUpperCase()}</div>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="modern-dropdown">
                <Dropdown.Item className="dropdown-item-modern text-danger">
                  <LogOut size={16} className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid className="main-content">
        <Row>
          <Col md={3} className="sidebar">
            <div className="sidebar-header">
              <h4>AI Dashboard</h4>
            </div>
            <Nav className="flex-column">
              <Nav.Link href="#"><Home size={18} /> Home</Nav.Link>
              <Nav.Link href="#"><BarChart size={18} /> Analytics</Nav.Link>
              <Nav.Link href="#"><PieChart size={18} /> Reports</Nav.Link>
              <Nav.Link href="#"><Activity size={18} /> Activity</Nav.Link>
              <Nav.Link href="#"><Briefcase size={18} /> Projects</Nav.Link>
              <Nav.Link href="#"><CheckCircle size={18} /> Tasks</Nav.Link>
              <Nav.Link href="#"><Settings size={18} /> Settings</Nav.Link>
            </Nav>
          </Col>

          <Col md={9} className="content">
          
             
              <>
                <Form className="prompt-box" onSubmit={handleSubmit}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Ask AI a question..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                    <Button type="submit" variant="primary">
                      <Send size={18} /> Submit
                    </Button>
                  </InputGroup>
                </Form>

                {answer && (
                  <div className="answer-box mt-3 p-3">
                    <h5>Answer:</h5>
                    <p>{answer}</p>
                  </div>
                )}
              </>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
  
};

export default Dashboard;


