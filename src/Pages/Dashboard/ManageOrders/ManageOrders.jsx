import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import SellerOrderDataRow from "../SellerOrderDataRow/SellerOrderDataRow";

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/manage-orders/${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Customer Email</th>
                <th>Price</th>
                <th>TransactionId</th>
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
                  userEmail={user?.email}
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
