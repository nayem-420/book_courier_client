import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { PiSpinnerGapBold } from "react-icons/pi";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utils";
import { useNavigate } from "react-router";

const Librarians = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isPending, mutate } = useMutation({
    mutationFn: async (bookData) => {
      const res = await axiosSecure.post("/books", bookData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Congratulations!",
        text: "Your book has been added.",
        icon: "success",
      }).then(() => {
        queryClient.invalidateQueries(["inventory", user?.email]);
        reset();
        navigate("/dashboard/my-inventory");
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const { title, author, price, quantity, status, description } = data;
      const imageFile = data?.image?.[0];

      if (!imageFile) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Please select an image",
        });
        return;
      }

      const imageURL = await imageUpload(imageFile);

      const bookData = {
        title,
        author,
        image: imageURL,
        price: Number(price),
        quantity: Number(quantity),
        status,
        description,
        seller: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
        createdAt: new Date(),
      };

      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Agree with the cost ৳${price}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!",
      });

      if (result.isConfirmed) {
        mutate(bookData);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to upload image. Please try again.",
      });
      console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Book</h1>

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
            <p className="text-red-500 text-sm">Book name is required</p>
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
            <p className="text-red-500 text-sm">Author is required</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="label">Book Image</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Price (৳)</label>
            <input
              type="number"
              {...register("price", { required: true, min: 1 })}
              className="input input-bordered w-full"
              placeholder="450"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">Valid price is required</p>
            )}
          </div>

          <div>
            <label className="label">Quantity</label>
            <input
              type="number"
              {...register("quantity", { required: true, min: 1 })}
              className="input input-bordered w-full"
              placeholder="10"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">Valid quantity is required</p>
            )}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="label">Status</label>
          <select
            {...register("status", { required: true })}
            defaultValue="unpublished"
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
          disabled={isPending}
        >
          {isPending && <PiSpinnerGapBold className="animate-spin text-xl" />}
          {isPending ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default Librarians;