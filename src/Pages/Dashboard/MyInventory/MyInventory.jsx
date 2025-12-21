import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BooksDataRow from "../../../Components/BooksDataRow";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const MyInventory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["inventory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/my-inventory/${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className="text-5xl font-bold">My Inventory: {books.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Job</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => (
              <BooksDataRow key={book._id} book={book} i={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyInventory;
