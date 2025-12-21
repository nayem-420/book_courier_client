import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const PaymentsSuccess = () => {
  const [searchParams] = useSearchParams();
  const { user,loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  const hasProcessed = useRef(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading || !user || !sessionId) return;

    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processPayment = async () => {
      try {
        await axiosSecure.patch(
          `/dashboard/payment-success?session_id=${sessionId}`
        );
      } catch (err) {
        setError("Payment processing failed");
        console.log(err);
      } finally {
        setIsProcessing(false);
      }
    };

    processPayment();
  }, [loading, user, sessionId, axiosSecure]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingSpinner />
        <h2 className="text-2xl font-bold mt-4">Processing your payment...</h2>
        <p className="text-gray-500 mt-2">Please wait</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-red-500 text-4xl font-bold">Payment Error</h1>
        <p className="text-gray-600 mt-4">{error}</p>
        <Link to={"/dashboard"} className="btn btn-primary mt-8">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-green-500 text-5xl font-bold">
        Payment Successful 🎉
      </h1>
      <p className="text-gray-600 text-lg mt-4">Thank you for your purchase!</p>
      <Link to={"/dashboard/my-orders"} className="btn btn-warning my-8">
        View My Orders
      </Link>
    </div>
  );
};

export default PaymentsSuccess;
