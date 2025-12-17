import React, { use } from 'react';
import BooksCard from './BooksCard';

const Books = ({ booksPromise }) => {
  const books = use(booksPromise);
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 my-8">
        {books.map((book) => (
          <BooksCard key={book.id} book={book}></BooksCard>
        ))}
      </div>
    </div>
  );
};

export default Books;