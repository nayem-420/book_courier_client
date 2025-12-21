import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import PurchaseModal from "../../../Components/PurchaseModal";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const {
    data: book = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/books/${id}`);
      return result.data;
    },
  });

  const {
    image,
    title,
    author,
    quantity,
    status,
    price,
    description,
    seller = {},
  } = book;

  // Open Modal
  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  // Close Modal
  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  // Increase quantity (max limit = stock)
  const incrementQuantity = () => {
    if (selectedQuantity < quantity) {
      setSelectedQuantity((prev) => prev + 1);
    }
  };

  // Decrease quantity (min limit = 1)
  const decrementQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  };

  // Loading state
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">Failed to load book details</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-base-100 rounded-2xl shadow-xl p-6 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Image */}
          <div className="flex justify-center">
            <img
              src={image}
              alt={title || "Book Cover"}
              className="w-64 h-80 object-cover rounded-xl shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2 space-y-4">
            <span className="badge badge-primary badge-outline">
              {status || "Fiction"}
            </span>

            <h1 className="text-3xl lg:text-4xl font-bold">{title}</h1>

            <p className="text-gray-500 text-sm">By {author}</p>

            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold text-primary">৳ {price}</p>
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                />
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{description}</p>

            <div className="flex gap-4 pt-4">
              <button className="btn btn-primary" onClick={handleOpenModal}>
                Make Payment
              </button>
            </div>
          </div>
        </div>

        {/* Extra Info */}
        <div className="divider my-10">More Information</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-4">
            <span className="font-semibold">Quantity:</span>
            <button
              onClick={decrementQuantity}
              className="btn btn-outline btn-sm"
            >
              -
            </button>
            <span className="px-4">{selectedQuantity}</span>
            <button
              onClick={incrementQuantity}
              className="btn btn-outline btn-sm"
            >
              +
            </button>
          </div>

          <div className="p-4 rounded-xl bg-base-200">
            <h3 className="font-semibold">Language</h3>
            <p className="text-gray-500">English</p>
          </div>
          <div className="p-4 rounded-xl bg-base-200">
            <h3 className="font-semibold">Status</h3>
            <p className="text-gray-500 capitalize">{status}</p>
          </div>
        </div>

        {/* Seller Information */}
        <div className="divider my-10">Seller Information</div>

        <div className="max-w-md mx-auto bg-base-100 border rounded-xl shadow-md p-6 flex items-center gap-4">
          {/* Seller Image */}
          <div className="avatar">
            <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={seller?.image || "https://via.placeholder.com/150"}
                alt={seller?.name || "Seller"}
                className="object-cover"
              />
            </div>
          </div>

          {/* Seller Details */}
          <div className="text-left">
            <h3 className="font-semibold text-lg capitalize">
              {seller?.name || "Unknown Seller"}
            </h3>
            <p className="text-sm text-gray-500">
              {seller?.email || "No email provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PurchaseModal
        book={{ ...book, selectedQuantity }}
        closeModal={handleCloseModal}
        modalRef={modalRef}
      />
    </div>
  );
};

export default BookDetails;
