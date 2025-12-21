import React from "react";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SellerOrderDataRow = ({ order, index, userEmail }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    _id,
    title,
    image,
    price,
    quantity,
    customer,
    transactionId,
    status,
  } = order;

  // 🔁 Update Order Status
  const handleStatusUpdate = async (newStatus) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Change status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    });

    if (!confirm.isConfirmed) return;

    try {
      // Fix: Use the correct endpoint that matches your server
      const res = await axiosSecure.patch(`/orders/${_id}`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        // Invalidate and refetch the orders query
        queryClient.invalidateQueries(["seller-orders", userEmail]);

        Swal.fire("Updated!", "Order status updated successfully", "success");
      } else {
        Swal.fire("Info", "No changes were made", "info");
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to update status", "error");
      console.error("Update error:", err);
    }
  };

  return (
    <tr>
      <td>{index + 1}</td>

      {/* Book Info */}
      <td className="flex items-center gap-3">
        <img
          src={image}
          alt={title}
          className="w-12 h-14 object-cover rounded"
        />
        <span className="font-medium">{title}</span>
      </td>

      {/* Buyer */}
      <td>
        <p className="font-semibold">{customer}</p>
      </td>

      {/* Price */}
      <td>৳ {price}</td>

      {/* Transaction */}
      <td className="text-xs text-gray-500">{transactionId}</td>

      {/* Quantity */}
      <td>{quantity}</td>

      {/* Status */}
      <td>
        <span
          className={`badge ${
            status === "pending"
              ? "badge-warning"
              : status === "shipped"
              ? "badge-info"
              : status === "delivered"
              ? "badge-success"
              : "badge-error"
          }`}
        >
          {status}
        </span>
      </td>

      {/* Actions */}
      <td className="space-x-2">
        {status === "pending" && (
          <>
            <button
              onClick={() => handleStatusUpdate("shipped")}
              className="btn btn-xs btn-info"
            >
              Ship
            </button>

            <button
              onClick={() => handleStatusUpdate("cancelled")}
              className="btn btn-xs btn-error"
            >
              Cancel
            </button>
          </>
        )}

        {status === "shipped" && (
          <button
            onClick={() => handleStatusUpdate("delivered")}
            className="btn btn-xs btn-success"
          >
            Deliver
          </button>
        )}

        {status === "delivered" && (
          <span className="text-green-600 font-semibold text-sm">
            Completed ✓
          </span>
        )}

        {status === "cancelled" && (
          <span className="text-red-600 font-semibold text-sm">Cancelled</span>
        )}
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
