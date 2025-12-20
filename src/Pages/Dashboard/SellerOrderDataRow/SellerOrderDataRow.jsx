import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const SellerOrderDataRow = ({ order, index, userEmail }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(order.status);

  // status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    axiosSecure.patch(`/orders/${order._id}`, { status: newStatus })
      .then(() => {
        queryClient.invalidateQueries(["orders", userEmail]);
      });
  };

  // cancel order
  const handleCancel = () => {
    Swal.fire({
      title: "Cancel order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosSecure.delete(`/orders/${order._id}`)
          .then(() => {
            queryClient.invalidateQueries(["orders", userEmail]);
          });
      }
    });
  };

  return (
    <tr>
      <td>{index + 1}</td>

      <td>
        <div className="font-bold">{order.title}</div>
        <div className="text-sm opacity-50">{order.category}</div>
      </td>

      <td>{order.customer}</td>
      <td>৳ {order.price}</td>
      <td className="text-xs">{order.transactionId}</td>
      <td>{order.quantity}</td>

      {/* STATUS */}
      <td>
        <select
          value={status}
          onChange={handleStatusChange}
          className="select select-bordered select-sm"
        >
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </td>

      {/* ACTION */}
      <td>
        {status === "pending" && (
          <button onClick={handleCancel} className="btn btn-xs btn-error">
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;