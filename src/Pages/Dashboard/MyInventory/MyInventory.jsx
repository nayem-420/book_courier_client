import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import BooksDataRow from "../../../Components/BooksDataRow";

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
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BooksDataRow key={book._id} book={book}></BooksDataRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyInventory;
