import React from "react";

const BooksCard = ({ book }) => {
  const { title, description, bookImg, author } = book;
  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
      <figure>
        <img
          className="rounded-xl h-64 w-full object-cover"
          src={bookImg}
          alt={title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p>{author}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;
