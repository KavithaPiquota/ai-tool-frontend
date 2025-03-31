import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Dropdown, Form } from 'react-bootstrap';
import { Home, BarChart, PieChart, Settings, Briefcase, Activity, CheckCircle, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import data from '../data/data.json';
import '../styles/Report.css';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TableComponents from '../components/ReusableTable';

const Reports = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'FEATURE', field: 'feature' },
    { header: 'DESCRIPTION', field: 'description' },
    { header: 'STATUS', field: 'status' },
    { header: 'CREATED AT', field: 'created_at' }
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          id="pager"
          key={i}
          onClick={() => handlePageClick(i)}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          style={{
            cursor: 'pointer',
            padding: '10px 15px',
            margin: '0 5px',
            borderRadius: '5px',
            background: currentPage === i ? '#007bff' : '#f1f1f1',
            color: currentPage === i ? '#fff' : '#000',
            transition: '0.3s',
          }}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };
  return (
    <div className="app-container">
      <div className={`${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>
      <div className="main-content expanded">
        <Header />
        <div>
          <Col md={9} className="content">
            <Form className="mb-3">
              <Form.Control
                className='search-bar'
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </Form>
            <TableComponents
              data={filteredData}
              columns={columns}
              searchTerm={searchTerm}
              currentPage={currentPage}
              recordsPerPage={recordsPerPage}
            />
            <div className="d-flex justify-content-center align-items-center pagination-container">
              <ChevronLeft
                className='right-arrow'
                size={30}
                onClick={handlePrev}
                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#ccc' : '#000' }}
                disabled={currentPage === 1}
              />
              <div className="page-numbers">{renderPageNumbers()}</div>
              <ChevronRight
                className='left-arrow'
                size={30}
                onClick={handleNext}
                style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#ccc' : '#000' }}
                disabled={currentPage === totalPages}
              />
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Reports;
