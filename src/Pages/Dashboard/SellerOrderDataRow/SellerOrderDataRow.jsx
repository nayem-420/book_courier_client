import React, { useState } from "react";
import DeleteModal from "./DeleteModal";

const SellerOrderDataRow = ({ order, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { customer, title, category, price, quantity, status, transactionId } =
    order || {};

  const closeModal = () => setIsOpen(false);

  const handleCancelOrder = () => {
    console.log("Order cancelled:", transactionId);

    // 🔜 এখানে backend API call যাবে
    // axiosSecure.patch(`/orders/cancel/${order._id}`)

    closeModal();
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>

        <td>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-sm opacity-50">{category}</div>
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
          {status === "pending" && (
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-xs btn-error"
            >
              Cancel
            </button>
          )}
        </td>
      </tr>

      {/* Modal */}
      <DeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        onConfirm={handleCancelOrder}
      />
    </>
  );
};

export default SellerOrderDataRow;