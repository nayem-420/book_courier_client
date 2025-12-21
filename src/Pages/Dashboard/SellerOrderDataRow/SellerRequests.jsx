import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SellerRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [], refetch } = useQuery({
    queryKey: ["seller-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/seller-requests");
      return res.data;
    },
  });

  const handleApprove = async (email) => {
    await axiosSecure.patch(`/seller-requests/approve/${email}`);
    Swal.fire("Approved!", "Seller role granted", "success");
    refetch();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Seller Requests</h2>

      {data.map((req) => (
        <div key={req._id} className="flex justify-between border p-3 mb-2">
          <span>{req.email}</span>
          <button
            onClick={() => handleApprove(req.email)}
            className="btn btn-sm btn-success"
          >
            Approve
          </button>
        </div>
      ))}
    </div>
  );
};

export default SellerRequests;
