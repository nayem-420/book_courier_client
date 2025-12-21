import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Loading from "../../../Components/Loading";

const BecomeSeller = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 
  const { data, isLoading } = useQuery({
    queryKey: ["seller-request-status"],
    queryFn: async () => {
      const res = await axiosSecure.get("/seller-request/status");
      return res.data;
    },
  });

  const handleBecomeSeller = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await axiosSecure.post("/become-seller");

      Swal.fire(
        "Request Sent",
        "Your seller request is pending admin approval.",
        "success"
      );

      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire(
          "Already Requested",
          "Your seller request is already pending.",
          "info"
        );
      } else {
        Swal.fire(
          "Error",
          err.response?.data?.message || "Something went wrong",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Become a Seller</h2>

      {data?.requested && (
        <p className="text-yellow-600 mb-4">
          Your request is pending admin approval.
        </p>
      )}

      <button
        onClick={handleBecomeSeller}
        disabled={loading || data?.requested}
        className="btn btn-primary w-full"
      >
        {loading
          ? "Processing..."
          : data?.requested
          ? "Request Pending"
          : "Confirm Become a Seller"}
      </button>
    </div>
  );
};

export default BecomeSeller;