import React from "react";

const CustomerOrderDataRow = ({ order, index }) => {
  const { image, title, category, price, quantity, status, transactionId } =
    order || {};

  return (
    <tr>
      {/* Serial */}
      <td>{index + 1}</td>

      {/* Book */}
      <td>
        <div className="flex items-center gap-3">
          <div className="w-12 h-16 rounded overflow-hidden">
            <img
              src={image || "https://via.placeholder.com/80x120?text=No+Image"}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-sm">{title}</p>
            <p className="text-xs opacity-50 capitalize">{category}</p>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="font-semibold">৳ {price}</td>
      <td className="font-semibold"> {transactionId}</td>

      {/* Quantity */}
      <td>{quantity}</td>

      {/* Status */}
      <td>
        <span
          className={`badge ${
            status === "pending" ? "badge-warning" : "badge-success"
          }`}
        >
          {status}
        </span>
      </td>

      {/* Action */}
      <td>
        <button className="btn btn-ghost btn-xs">Delete</button>
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
