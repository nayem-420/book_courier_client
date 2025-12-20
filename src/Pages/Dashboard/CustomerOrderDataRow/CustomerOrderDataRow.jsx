import React, { useRef } from "react";

const CustomerOrderDataRow = ({ order, index }) => {
  const modalRef = useRef(null);

  const { image, title, category, price, quantity, status, transactionId } =
    order || {};

  const handleDelete = () => {
    console.log("Deleting order:", transactionId);
    modalRef.current.close();
  };

  return (
    <>
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

        {/* Transaction */}
        <td className="font-semibold">{transactionId}</td>

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
          {status === "pending" && (
            <button
              className="btn btn-error btn-xs"
              onClick={() => modalRef.current.showModal()}
            >
              Delete
            </button>
          )}
        </td>
      </tr>

      {/* Confirmation Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">
            Do you really want to cancel this order? This action cannot be
            undone.
          </p>

          <div className="modal-action">
            <button className="btn" onClick={() => modalRef.current.close()}>
              No
            </button>
            <button className="btn btn-error" onClick={handleDelete}>
              Yes
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CustomerOrderDataRow;