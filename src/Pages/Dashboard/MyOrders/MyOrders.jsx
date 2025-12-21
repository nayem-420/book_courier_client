import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import CustomerOrderDataRow from "../CustomerOrderDataRow/CustomerOrderDataRow";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard/my-orders`);
      return res.data;
    },
  });

  if (isError) {
    console.error("Error loading orders:", error);
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load orders: {error.message}
      </p>
    );
  }

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <h1 className="font-bold text-3xl mb-6">My Orders ({orders.length})</h1>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Book</th>
                    <th>Price</th>
                    <th>TransactionId</th>
                    <th>Qty</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order, index) => (
                    <CustomerOrderDataRow
                      key={order._id}
                      order={order}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;