import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentsSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure.post(`/dashboard/payment-success`, { sessionId });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-green-500 text-5xl font-bold">
        payment successful 🎉
      </h1>
      <Link to={"/dashboard/my-orders"} className="btn btn-warning my-8">
        My Orders
      </Link>
    </div>
  );
};

export default PaymentsSuccess;
