import React, { useRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const CustomerOrderDataRow = ({ order, index }) => {
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { userEmail } = useAuth();
  const queryClient = useQueryClient();

  const { image, title, category, price, quantity, status, transactionId } =
    order || {};

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/orders/${order._id}`);

      Swal.fire({
        icon: "success",
        title: "Cancelled",
        text: "Your order has been cancelled",
        timer: 1500,
        showConfirmButton: false,
      });

      modalRef.current.close();

      queryClient.invalidateQueries(["my-orders", userEmail]);
    } catch (error) {
      Swal.fire("Error", "Failed to cancel order", "error");
      console.log(error);
    }
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
                src={
                  image || "https://via.placeholder.com/80x120?text=No+Image"
                }
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
              Cancel
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
