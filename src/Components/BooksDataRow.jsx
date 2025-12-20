import React from "react";
import { Link } from "react-router";

const BooksDataRow = ({ book, i }) => {
  const { _id, image, title, status, price } = book || {};

  return (
    <tr>
      <td>{i + 1}</td>

      {/* Book Info */}
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt={title} />
            </div>
          </div>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-sm opacity-50">৳ {price}</div>
          </div>
        </div>
      </td>

      {/* Status */}
      <td>
        <span
          className={`badge ${
            status === "published"
              ? "badge-success"
              : "badge-warning"
          }`}
        >
          {status}
        </span>
      </td>

      {/* Edit */}
      <td>
        <Link
          to={`/dashboard/edit-book/${_id}`}
          className="btn btn-ghost btn-xs"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default BooksDataRow;