import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import '../styles/Report.css';

const ReusableTable = ({ data, columns, searchTerm, currentPage, recordsPerPage }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key]?.toString().toLowerCase();
    const bValue = b[sortConfig.key]?.toString().toLowerCase();
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  const formatDate = (value) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th
              key={index}
              onClick={() => handleSort(col.field)}
              className={sortConfig.key === col.field ? 'sortable active-sort' : 'sortable'}
              style={{ cursor: 'pointer' }}
            >
              {col.header}
              {sortConfig.key === col.field ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentRecords.length > 0 ? (
          currentRecords.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                searchTerm &&
                Object.values(item).some((value) =>
                  value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
                  ? 'highlight'
                  : ''
              }
            >
              {columns.map((col, colIndex) => {
                const cellValue = item[col.field];
                const formattedValue =
                  col.field.toLowerCase().includes('date') || col.field.toLowerCase().includes('created')
                    ? formatDate(cellValue)
                    : cellValue;
                return <td key={colIndex}>{formattedValue}</td>;
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center">
              No matching records found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ReusableTable;
