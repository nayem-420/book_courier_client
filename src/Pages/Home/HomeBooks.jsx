import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";
import BooksCard from "./Books/BooksCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const HomeBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["home-books"],
    queryFn: async () => {
      const response = await axiosSecure.get("/home-books");
      return response.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center my-12">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">
          Featured Books
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Check out our top picks this week!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {books.map((book) => (
          <BooksCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default HomeBooks;