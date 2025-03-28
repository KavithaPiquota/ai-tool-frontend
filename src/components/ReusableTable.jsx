import React from 'react';
import { Table } from 'react-bootstrap';

const ReusableTable = ({ data, columns, searchTerm, currentPage, recordsPerPage }) => {
  
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentRecords.length > 0 ? (
          currentRecords.map((item, rowIndex) => (
            <tr key={rowIndex} className={searchTerm && Object.values(item).some((value) => 
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            ) ? 'highlight' : ''}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{item[col.field]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center">No matching records found</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ReusableTable;
