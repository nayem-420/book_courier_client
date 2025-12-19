import React from 'react';

const BooksDataRow = ({ book, i }) => {
    const {
        image,
      customer,
      title,
      category,
      price,
      quantity,
      status,
      transactionId,
    } = book || {};
    return (
      <tr>
        <td>{i + 1}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt={title} />
            </div>
          </div>
            <div>
              <div className="font-bold">{title}</div>
              <div className="text-sm opacity-50">{category}</div>
            </div>
          </div>
        </td>
        <td>{customer}</td>
        <td>৳ {price}</td>
        <td className="text-xs">{transactionId}</td>
        <td>{quantity}</td>
        <td>
          <span
            className={`badge ${
              status === "pending"
                ? "badge-warning"
                : status === "completed"
                ? "badge-success"
                : "badge-error"
            }`}
          >
            {status}
          </span>
        </td>
        <td>
          <button className="btn btn-ghost btn-xs">Details</button>
        </td>
      </tr>
    );
};

export default BooksDataRow;