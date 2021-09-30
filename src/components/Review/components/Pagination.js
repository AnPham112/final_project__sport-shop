import React from 'react';
import './style.css';

const Pagination = ({ totalPages, changePage }) => {
  const pages = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
      {pages.map((num, index) => (
        <button
          key={index}
          className="numberPagination"
          onClick={() => changePage(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
}

export default Pagination;