import { useState } from "react";
import UpdateUserRoleModal from "./UpdateUserRoleModal";

const UserDataRow = ({ user, refetchUsers }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <tr>
      <td className="px-5 py-5 border-b bg-white text-sm">{user.email}</td>

      <td className="px-5 py-5 border-b bg-white text-sm">{user.role}</td>

      <td className="px-5 py-5 border-b bg-white text-sm">
        {user.status || "Active"}
      </td>

      <td className="px-5 py-5 border-b bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="cursor-pointer inline-block px-3 py-1 font-semibold text-green-900"
        >
          <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
          <span className="relative">Update Role</span>
        </span>

        <UpdateUserRoleModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          user={user}
          refetchUsers={refetchUsers}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
