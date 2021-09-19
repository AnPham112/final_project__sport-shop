import React from 'react';

const Pagination = ({ totalPages, changePage }) => {
  const pages = [...Array(totalPages).keys()].map(num => num + 1);
  console.log('pages', pages);
  return (
    <div>{pages.map((num) => (
      <button
        key={num}
        onClick={() => changePage(num)}
      >
        {num}
      </button>
    ))}</div>
  );
}

export default Pagination;