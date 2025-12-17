import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Librarians = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
    const { price } = data;


    Swal.fire({
      title: "Are you sure?",
      text: `Agree with the cost ৳${price}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/books", data).then((res) => {
          console.log(res.data);
        });
        Swal.fire({
          title: "Congratulations!",
          text: "Your book has been added.",
          icon: "success",
        });
        // TODO: POST bookData to backend here
        reset();
      }
    });
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
        </div>

        {/* Image */}
        <div>
          <label className="label">Book Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="input input-bordered w-full"
            placeholder="https://image-url.com"
          />
        </div>

        {/* sender name */}
        <div>
          <label className="label">
            <span className="label-text">Sender Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full"
            defaultValue={user?.displayName}
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}
        </div>

        {/* sender email */}
        <div>
          <label className="label">
            <span className="label-text">Email Address</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            defaultValue={user?.email}
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
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
              placeholder="450"
            />
          </div>

          <div>
            <label className="label">Quantity</label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              className="input input-bordered w-full"
              placeholder="10"
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
        <button className="btn btn-primary w-full">Add Book</button>
      </form>
    </div>
  );
};

export default Librarians;
