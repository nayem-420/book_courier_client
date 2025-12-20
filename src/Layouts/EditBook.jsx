// EditBook.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { PiSpinnerGapBold } from "react-icons/pi";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { imageUpload } from "../utils";
import LoadingSpinner from "../Components/LoadingSpinner";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosSecure.get(`/books/${id}`);
        setInitialData(res.data);
        reset(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load book data",
        });
        navigate("/dashboard/my-inventory");
      }
    };
    fetchBook();
  }, [id, axiosSecure, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      let updatedBook = { ...data };

      if (data.image && data.image[0]) {
        const imageURL = await imageUpload(data.image[0]);
        updatedBook.image = imageURL;
      }

      delete updatedBook.image?.file;

      await axiosSecure.patch(`/books/${id}`, updatedBook);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Book updated successfully!",
      }).then(() => {
        navigate("/dashboard/my-inventory");
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the book.",
      });
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Book</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Book Name */}
        <div>
          <label className="label">Book Name</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter book name"
          />
          {errors.title && (
            <p className="text-red-500">Book name is required</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="label">Author Name</label>
          <input
            type="text"
            {...register("author", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter author name"
          />
          {errors.author && (
            <p className="text-red-500">Author name is required</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="label">Book Image</label>
          <input
            type="file"
            {...register("image")}
            className="file-input file-input-bordered w-full"
          />
          {initialData?.image && (
            <img
              src={initialData.image}
              alt="Book"
              className="w-24 h-24 mt-2 rounded"
            />
          )}
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Price (৳)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Quantity</label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="label">Status</label>
          <select
            {...register("status", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="label">Short Description</label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full"
            placeholder="Write short description..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <PiSpinnerGapBold className="animate-spin text-xl" />
          )}
          {isSubmitting ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
