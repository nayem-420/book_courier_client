import React from "react";
import { Link } from "react-router";

const BooksCard = ({ book }) => {
  const { _id, title, description, image, author } = book || {};

  return (
    <Link
      to={`/all-books/${_id}`}
      className="card bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
    >
      <figure>
        <img
          className="rounded-xl h-64 w-full object-cover"
          src={image}
          alt={title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="line-clamp-3">{description}</p>
        <p className="text-sm text-gray-500">By {author}</p>
      </div>
    </Link>
  );
};

export default BooksCard;
