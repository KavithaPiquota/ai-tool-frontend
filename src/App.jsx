import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import SearchHistory from './pages/SearchHistory';
import './styles/style.css';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/report" element={<Layout><Reports /></Layout>} />
        <Route path="/history" element={<Layout><SearchHistory /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
