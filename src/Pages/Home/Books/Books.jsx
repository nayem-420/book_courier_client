import React from "react";
import BooksCard from "./BooksCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Books = () => {
  const axiosSecure = useAxiosSecure();

  const { data: books = [] } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axiosSecure.get("/books");
      return response.data;
    },
  });

  return (
    <div className="container mx-auto px-4">
      <div className="text-center my-12">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">
          Our Book Collection
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our curated selection of amazing books from various genres.
          Find your next favorite read!
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

export default Books;
