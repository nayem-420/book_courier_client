import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetchUsers }) => {
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(user.role);

  if (!isOpen) return null;

  const handleUpdate = async () => {
    await axiosSecure.patch(`/users/${user._id}`, { role });
    Swal.fire("Success", "Role Updated", "success");
    refetchUsers();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-80">
        <h3 className="font-bold mb-4">Update Role</h3>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="select select-bordered w-full mb-4"
        >
          <option value="Customer">Customer</option>
          <option value="Seller">Seller</option>
          <option value="Admin">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={closeModal} className="btn btn-sm">
            Cancel
          </button>
          <button onClick={handleUpdate} className="btn btn-sm btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserRoleModal;