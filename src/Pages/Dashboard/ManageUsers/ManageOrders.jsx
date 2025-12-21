import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import SellerOrderDataRow from "./SellerOrderDataRow";

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["seller-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/manage-orders/${user.email.toLowerCase()}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">Failed to load orders</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Manage Orders ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No orders for your books yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Customer</th>
                <th>Price</th>
                <th>Transaction ID</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <SellerOrderDataRow
                  key={order._id}
                  order={order}
                  index={index}
                  userEmail={user.email}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
