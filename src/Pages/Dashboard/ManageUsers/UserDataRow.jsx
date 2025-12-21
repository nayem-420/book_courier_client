import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserDataRow = ({ user, refetchUsers }) => {
  const axiosSecure = useAxiosSecure();

  const handleAccept = async () => {
    try {
      await axiosSecure.patch("/update-role", {
        email: user.email,
        role: "Seller",
      });

      Swal.fire({
        icon: "success",
        title: "Seller Approved",
        text: `${user.email} is now a Seller!`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Remove row from table
      refetchUsers((prev) => prev.filter((u) => u.email !== user.email));
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  const handleCancel = async () => {
    try {
      await axiosSecure.delete(`/seller-request/${user.email}`);

      Swal.fire({
        icon: "info",
        title: "Request Cancelled",
        text: `${user.email}'s seller request was cancelled.`,
        timer: 2000,
        showConfirmButton: false,
      });

      refetchUsers((prev) => prev.filter((u) => u.email !== user.email));
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b">{user.email}</td>
      <td className="px-5 py-5 border-b">{user.role || "Pending"}</td>
      <td className="px-5 py-5 border-b">{user.status || "Pending"}</td>
      <td className="px-5 py-5 border-b">
        <button
          onClick={handleAccept}
          className="bg-green-500 text-white px-2 py-1 rounded mr-2"
        >
          Accept
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default UserDataRow;
