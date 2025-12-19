import React from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PurchaseModal = ({ closeModal, modalRef, book }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { _id, title, status, price, description, image, seller, quantity } =
    book || {};

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        bookId: _id,
        name: title,
        title,
        status,
        price,
        description,
        image,
        quantity: 1,
        seller,
        customer: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      // Close modal first
      closeModal();

      // Make payment request
      const { data } = await axiosSecure.post(
        `/create-checkout-session`,
        paymentInfo
      );

      // Redirect to payment URL
      if (data?.url) {
        window.location.href = data.url;
      } else {
        // If no payment gateway, show success
        Swal.fire({
          title: "Payment Successful!",
          text: `You have successfully purchased "${title}" for ৳${price}`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box max-w-sm">
        <h3 className="font-bold text-lg mb-4">Review Info Before Purchase</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Book:</span>
            <span className="font-semibold">{title}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Category:</span>
            <span className="font-semibold capitalize">{status}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Seller:</span>
            <span className="font-semibold">{seller?.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Customer:</span>
            <span className="font-semibold">{user?.displayName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Price:</span>
            <span className="font-semibold text-primary">৳ {price}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Available:</span>
            <span className="font-semibold">{quantity} pcs</span>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn btn-error" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={handlePayment}>
            Pay
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PurchaseModal;