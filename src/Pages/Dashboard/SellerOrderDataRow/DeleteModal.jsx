import React from "react";

const DeleteModal = ({ isOpen, closeModal, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-bold mb-3">Are you sure?</h2>
        <p className="text-sm text-gray-600 mb-5">
          Do you really want to cancel this order? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={closeModal} className="btn btn-sm">
            No
          </button>

          <button onClick={onConfirm} className="btn btn-sm btn-error">
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
