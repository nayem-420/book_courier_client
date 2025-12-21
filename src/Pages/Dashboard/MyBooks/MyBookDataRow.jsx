import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyBookDataRow = ({ book, index, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleUnpublish = async () => {
    try {
      await axiosSecure.patch(`/books/status/${book._id}`, {
        status: book.status === "published" ? "unpublished" : "published",
      });
      refetch();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td className="flex items-center gap-2">
        <img
          src={book.image}
          alt={book.name}
          className="w-12 h-16 object-cover rounded"
        />
        <span>{book.name}</span>
      </td>
      <td>{book.category || "N/A"}</td>
      <td>${book.price || "0.00"}</td>
      <td>{book.quantity || 0}</td>
      <td>
        <span
          className={`px-2 py-1 rounded-full text-white text-sm ${
            book.status === "published" ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          {book.status}
        </span>
      </td>
      <td className="flex gap-2">
        <Link
          to={`/dashboard/edit-book/${book._id}`}
          className="btn btn-sm btn-warning"
        >
          Edit
        </Link>
        <button onClick={handleUnpublish} className="btn btn-sm btn-secondary">
          {book.status === "published" ? "Unpublish" : "Publish"}
        </button>
      </td>
    </tr>
  );
};

export default MyBookDataRow;
